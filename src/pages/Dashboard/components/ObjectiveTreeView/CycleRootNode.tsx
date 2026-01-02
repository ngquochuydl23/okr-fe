// import type { Cycle } from '@/api/cycles/dto';
// import { Handle, Position } from '@xyflow/react';
// import { memo } from 'react';
// import styles from './objective-tree-view.module.scss';
// import _ from 'lodash';
// import type { Organization } from '@/api/organization/dto';

// export type CycleNodeData = {
//   data: {
//     cycle: Cycle;
//     organization: Organization;
//     objectiveIds: number[];
//   }
// }

// const CycleRootNote = memo((props) => {
//   const { cycle, objectiveIds, organization } = (props as CycleNodeData).data;
//   return (
//     <div className={styles.cycleRootNote}>
//       <div className={styles.title}>{organization?.name} - {cycle?.name} Goal</div>
//       {_.map(objectiveIds, (id) => (
//         <Handle
//           key={id}
//           type="source"
//           position={Position.Bottom}
//           id={id.toString()}
//           isConnectable
//         />
//       ))}
//     </div>
//   );
// });

// export default CycleRootNote; 