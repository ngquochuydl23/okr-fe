// import { memo, useMemo, useCallback, useState, useEffect } from "react";
// import styles from "./objective-tree-view.module.scss";
// // import type { Cycle } from "@/api/cycles/dto";
// // import type { ObjectiveItem } from "@/api/objective/dto";
// import {
//   ReactFlow,
//   Controls,
//   Background,
//   Panel,
//   useEdgesState,
//   ConnectionLineType,
//   ControlButton,
//   useReactFlow,
//   useNodesState,
//   Position,
// } from "@xyflow/react";
// import type { Edge, Node } from "@xyflow/react";
// //import CycleRootNote from "./CycleRootNode";
// import ObjectiveNode, { type ObjectiveNodeData } from "./ObjectiveNode";
// // import { useAppSelector } from "@/stores/hooks";
// // import ChartDescriptionPanel from "./ChartDescriptionPanel";
// // import IconButton from "@mui/material/IconButton";
// import clsx from "clsx";
// // import { useTranslation } from "react-i18next";
// // import _ from "lodash";
// // import { LoadingSpinner } from "@/components/LoadingSpinner";
// // import SectionHeader from "../SectionHeader";

// interface ObjectiveTreeViewProps {
//   cycle?: Cycle | null;
//   rootObjectives?: ObjectiveItem[] | null;
//   gapXNode?: number;
//   levelGap?: number;
//   loading: boolean;
// }

// const ObjectiveTreeView = memo(
//   ({
//     cycle,
//     rootObjectives,
//     gapXNode = 200,
//     levelGap = 250,
//     loading,
//   }: ObjectiveTreeViewProps) => {
//     const { zoomIn, zoomOut, fitView: fitViewFlow } = useReactFlow();
//     const { t } = useTranslation();
//     const { user } = useAppSelector((state) => state.auth);
//     const [nodes, setNodes, onNodesChange] = useNodesState([]);
//     const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//     const [isLocked, setIsLocked] = useState(true);

//     const centerOffset = useMemo(() => {
//       return (((rootObjectives?.length || 0) - 1) * gapXNode) / 2;
//     }, [gapXNode, cycle, rootObjectives, loading]);

//     useEffect(() => {
//       setTimeout(() => {
//         if (_.isEmpty(rootObjectives)) {
//           setEdges([]);
//           setNodes([]);
//           return;
//         }
//         _initNodes();
//         _initEdges();
//       }, 300);
//     }, [rootObjectives]);

//     const _initEdges = () => {
//       const initEdges: never[] = _.map(
//         rootObjectives,
//         (item) =>
//           ({
//             id: `edge-${item.id}`,
//             source: "root",
//             target: item.id.toString(),
//             sourceHandle: item.id.toString(),
//             type: "smoothstep",
//             animated: true,
//           } as never)
//       );
//       setEdges(initEdges);
//       fitViewFlow({ padding: 0.1 });
//     };

//     const _initNodes = () => {
//       const initialNodes = [
//         {
//           id: "root",
//           position: { x: 0, y: 0 },
//           data: {
//             cycle,
//             organization: user?.organization,
//             objectiveIds: _.map(rootObjectives, (objective) => objective.id),
//           },
//           type: "cycleRoot",
//           sourcePosition: "bottom",
//         },
//         ..._.map(rootObjectives, (objective, index) => ({
//           id: objective.id.toString(),
//           position: { x: index * gapXNode - centerOffset, y: 100 },
//           data: {
//             objective,
//             level: 1,
//             childs: [],
//             onLoadedChildObjectives: handleLoadedChildObjectives,
//           },
//           targetPosition: "top",
//           type: "objectiveNode",
//         })),
//       ] as never[];
//       setNodes(initialNodes);
//     };

//     const handleLoadedChildObjectives = useCallback(
//       (parentId: number, childs: ObjectiveItem[]) => {
//         const parentNodeToFocus = parentId;
//         setNodes((prevNodes: any) => {
//           const nodes = prevNodes.map((node: Node) => {
//             if (node.id === parentId.toString()) {
//               return {
//                 ...node,
//                 data: { ...node.data, childs: childs },
//               };
//             }
//             return node;
//           });

//           const rootNode = nodes.find((node: Node) => node.id === "root");
//           if (!rootNode) {
//             return prevNodes;
//           }

//           const allNodes: Node[] = [rootNode];
//           const allEdges: Edge[] = [];

//           const calculateSubtreeWidth = (nodeId: string): number => {
//             const node = nodes.find((n: Node) => n.id === nodeId);
//             if (!node) return gapXNode;

//             const childs = (node.data as any)?.childs || [];
//             if (_.isEmpty(childs)) {
//               return gapXNode;
//             }
//             const totalChildWidth = childs.reduce(
//               (sum: number, child: ObjectiveItem) => {
//                 return sum + calculateSubtreeWidth(child.id.toString());
//               },
//               0
//             );

//             return Math.max(totalChildWidth, gapXNode);
//           };

//           const buildTree = (
//             parentNode: Node,
//             parentX: number,
//             parentY: number,
//             parentLevel: number
//           ) => {
//             const childs = (parentNode.data as any).childs || [];
//             if (_.isEmpty(childs)) {
//               return;
//             }

//             const childLevel = parentLevel + 1;
//             const childWidths = childs.map((child: ObjectiveItem) =>
//               calculateSubtreeWidth(child.id.toString())
//             );
//             const totalWidth = childWidths.reduce(
//               (sum: number, w: number) => sum + w,
//               0
//             );

//             let currentX = parentX - totalWidth / 2;

//             childs.forEach((child: ObjectiveItem, index: number) => {
//               const childId = child.id.toString();
//               const childWidth = childWidths[index];
//               const childX = currentX + childWidth / 2;
//               const childY = parentY + levelGap;
//               const existingNode = nodes.find(
//                 (node: Node) => node.id === childId
//               );
//               const existingChilds = existingNode?.data?.childs || [];

//               const childNode: Node = {
//                 id: child.id.toString(),
//                 position: { x: childX, y: childY },
//                 data: {
//                   objective: child,
//                   parentId: parentNode.id ? Number(parentNode.id) : null,
//                   childs: existingChilds,
//                   level: childLevel,
//                   subtreeWidth: childWidth,
//                   onLoadedChildObjectives: handleLoadedChildObjectives,
//                 } as ObjectiveNodeData["data"],
//                 targetPosition: Position.Top,
//                 type: "objectiveNode",
//               };

//               allNodes.push(childNode);
//               allEdges.push({
//                 id: `edge-${parentNode.id}-${childId}`,
//                 source: parentNode.id.toString(),
//                 target: childId,
//                 sourceHandle: childId,
//                 type: "smoothstep",
//                 animated: true,
//               } as Edge);

//               buildTree(childNode, childX, childY, childLevel);
//               currentX += childWidth;
//             });
//           };

//           const rootObjectiveIds = (rootNode.data as any).objectiveIds || [];
//           const rootWidths = rootObjectiveIds.map((objId: number) =>
//             calculateSubtreeWidth(objId.toString())
//           );
//           const totalRootWidth = rootWidths.reduce(
//             (sum: number, w: number) => sum + w,
//             0
//           );

//           let currentRootX = -totalRootWidth / 2;

//           rootObjectiveIds.forEach((objId: number, index: number) => {
//             const rootObj = nodes.find(
//               (node: Node) => node.id === objId.toString()
//             );
//             if (rootObj) {
//               const rootWidth = rootWidths[index];
//               const objX = currentRootX + rootWidth / 2;
//               const objY = 100;

//               const existingChilds = rootObj.data?.childs || [];
//               const objNode: Node = {
//                 id: objId.toString(),
//                 position: { x: objX, y: objY },
//                 data: {
//                   ...rootObj.data,
//                   level: 1,
//                   childs: existingChilds,
//                   subtreeWidth: rootWidth,
//                   onLoadedChildObjectives: handleLoadedChildObjectives,
//                 },
//                 targetPosition: Position.Top,
//                 type: "objectiveNode",
//               };

//               allNodes.push(objNode);

//               allEdges.push({
//                 id: `edge-${objId}`,
//                 source: "root",
//                 target: objId.toString(),
//                 sourceHandle: objId.toString(),
//                 type: "smoothstep",
//                 animated: true,
//               } as Edge);

//               buildTree(objNode, objX, objY, 1);
//               currentRootX += rootWidth;
//             }
//           });

//           setEdges(allEdges as never[]);
//           setTimeout(() => {
//             const parentNode = allNodes.find(
//               (node) => node.id === parentNodeToFocus.toString()
//             );
//             if (parentNode) {
//               const childNodes = allNodes.filter(
//                 (node) =>
//                   (node.data as ObjectiveNodeData["data"])?.parentId ===
//                   parentNodeToFocus
//               );
//               const nodesToFit = [parentNode, ...childNodes];

//               fitViewFlow({
//                 nodes: nodesToFit.map((n) => ({ id: n.id })),
//                 duration: 800,
//                 padding: 0.3,
//                 minZoom: 0.3,
//                 maxZoom: 2,
//               });
//             }
//           }, 100);

//           return allNodes;
//         });
//       },
//       [gapXNode, levelGap, fitViewFlow, setNodes, setEdges]
//     );

//     const toggleLock = () => {
//       setIsLocked(!isLocked);
//     };

//     const handleZoomIn = () => {
//       setIsLocked(false);
//       zoomIn();
//     };

//     const handleZoomOut = () => {
//       setIsLocked(false);
//       zoomOut();
//     };

//     const handleFitView = () => {
//       setNodes((prevNodes: any) => {
//         return prevNodes.map((node: Node) => {
//           if (node.id === "root") {
//             return node;
//           }
//           return {
//             ...node,
//             data: {
//               ...node.data,
//               childs: [],
//             },
//           };
//         });
//       });

//       setEdges((prevEdges: never[]) => {
//         return prevEdges.filter((edge: Edge) => edge.source === "root");
//       });

//       setTimeout(() => {
//         fitViewFlow({
//           padding: 0.1,
//           duration: 800,
//         });
//       }, 100);
//     };

//     return (
//       <div className={styles.objectiveTreeView}>
//         <SectionHeader
//           title={t("PAGES.DASHBOARD.MINIMAP")}
//           actions={
//             <div>
//               <IconButton
//                 onClick={toggleLock}
//                 sx={{ borderRadius: 0, color: "black" }}
//                 disableTouchRipple
//               >
//                 <Icon iconName={isLocked ? "lock-closed" : "lock-open"} />
//               </IconButton>
//               <IconButton
//                 sx={{ borderRadius: 0, color: "black" }}
//                 disableTouchRipple
//               >
//                 <Icon iconName="options" />
//               </IconButton>
//             </div>
//           }
//         />
//         <div
//           className={clsx(styles.minimapWrapper, {
//             [styles.locked]: !isLocked,
//           })}
//         >
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             fitView
//             zoomActivationKeyCode={"Control"}
//             panActivationKeyCode={"Control"}
//             preventScrolling={!isLocked}
//             nodesDraggable={!isLocked}
//             nodesConnectable={!isLocked}
//             nodeTypes={{
//               cycleRoot: CycleRootNote,
//               objectiveNode: ObjectiveNode,
//             }}
//             connectionLineType={ConnectionLineType.SmoothStep}
//             onEdgesChange={onEdgesChange}
//           >
//             {!loading ? (
//               <>
//                 <Controls
//                   orientation="horizontal"
//                   className={styles.controls}
//                   showZoom={false}
//                   showFitView={false}
//                   showInteractive={false}
//                 >
//                   <ControlButton onClick={handleFitView}>
//                     <Icon iconName="fullscreen" />
//                   </ControlButton>
//                   <ControlButton onClick={handleZoomIn}>
//                     <Icon iconName="zoom-in" />
//                   </ControlButton>
//                   <ControlButton onClick={handleZoomOut}>
//                     <Icon iconName="zoom-out" />
//                   </ControlButton>
//                   <ControlButton onClick={toggleLock}>
//                     <Icon iconName={isLocked ? "lock-closed" : "lock-open"} />
//                   </ControlButton>
//                 </Controls>
//                 <Background />
//                 <Panel position="top-left">
//                   <ChartDescriptionPanel />
//                 </Panel>
//               </>
//             ) : (
//               <div className={styles.loadingChart}>
//                 <div>
//                   {/* <LoadingSpinner fullscreen={false} /> */}
//                 </div>
//               </div>
//             )}
//           </ReactFlow>
//         </div>
//       </div>
//     );
//   }
// );

// export default ObjectiveTreeView;
