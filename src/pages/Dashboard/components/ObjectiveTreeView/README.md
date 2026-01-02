# ObjectiveTreeView Component

A React component for visualizing OKR (Objectives and Key Results) hierarchies in an interactive tree layout using React Flow.

## Components

### index.tsx
Main component that orchestrates the tree visualization.

**Props:**
- `cycle`: Current cycle information
- `rootObjectives`: Array of top-level objectives
- `gapXNode`: Horizontal spacing between nodes (default: 200)
- `levelGap`: Vertical spacing between levels (default: 250)
- `loading`: Loading state indicator

**Key Features:**
- Dynamic tree layout calculation
- Recursive subtree width computation
- Auto-fit view on expand with smooth animations
- Lock/unlock mode for interaction control
- Collapse all functionality

**State Management:**
- `nodes`: Array of all nodes in the tree
- `edges`: Array of all connections between nodes
- `isLocked`: Controls user interaction mode

**Key Functions:**

#### `handleLoadedChildObjectives(parentId, childs)`
Called when a node's children are loaded:
1. Updates parent node with new children data
2. Recalculates entire tree layout
3. Rebuilds all nodes and edges
4. Focuses on expanded parent with children in view

#### `calculateSubtreeWidth(nodeId)`
Recursively calculates the total width needed for a node's subtree:
- Base width: `gapXNode` for leaf nodes
- Recursive width: Sum of all children's subtree widths
- Returns maximum of total child width or `gapXNode`

#### `buildTree(parentNode, parentX, parentY, parentLevel)`
Recursively builds the tree structure:
- Calculates positions for all child nodes
- Creates edges between parent and children
- Handles existing children data persistence
- Updates subtree width for each node

#### `handleFitView()`
Resets view to initial state:
1. Collapses all nodes (sets `childs` to `[]`)
2. Removes all edges except root connections
3. Fits view with animation

**Interaction Controls:**
- `Ctrl + Scroll`: Zoom when locked
- `Ctrl + Drag`: Pan when locked
- Lock button: Toggle interaction mode
- Fullscreen button: Collapse all and fit view
- Zoom in/out buttons: Manual zoom controls

---

### ObjectiveNode.tsx
Individual node component representing a single objective.

**Type Definition:**
```typescript
ObjectiveNodeData = {
  id: string;
  data: {
    level: number;
    objective: ObjectiveItem;
    parentId: number | null;
    childs: ObjectiveItem[];
    onLoadedChildObjectives: (parentId: number, objectives: ObjectiveItem[]) => void;
    onCollapseChildObjectives?: (parentId: number) => void;
  }
}
```

**Features:**
- Progress bar visualization
- Owner avatar and information
- Expand/collapse button (if `hasChildren`)
- Loading indicator during child fetch
- Link to objective detail page
- Text ellipsis for long titles (max 4 lines)
- Multiple source handles for child connections

**State:**
- `isExpanded`: Tracks expansion state
- `loading`: Loading state from API call

**Functions:**

#### `getChilds()`
Async function to fetch child objectives:
- Calls `ObjectiveService.getByParentId()`
- Invokes `onLoadedChildObjectives` callback
- Sets `isExpanded` to true on success

#### `handleToggle()`
Handles expand/collapse toggle:
- If expanded: Calls `onCollapseChildObjectives` and sets `isExpanded` to false
- If collapsed and children loaded: Sets `isExpanded` to true
- If collapsed and no children: Calls `getChilds()` to load

---

### CycleRootNode.tsx
Root node component representing the cycle.

**Data Structure:**
```typescript
CycleNodeData = {
  id: string;
  data: {
    cycle: Cycle;
    organization: Organization;
    objectiveIds: number[];
  }
}
```

**Features:**
- Displays cycle name and date range
- Shows organization information
- Multiple source handles for root objectives
- Distinct styling from objective nodes

---

### ChartDescriptionPanel.tsx
Legend/description panel for the tree visualization.

**Features:**
- Explains node colors and symbols
- Provides interaction instructions
- Keyboard shortcuts reference
- Can be shown/hidden

---

## Layout Algorithm

### Width Calculation
1. **Leaf nodes**: Base width = `gapXNode`
2. **Parent nodes**: Width = sum of children's widths
3. **Minimum width**: Always at least `gapXNode`

### Position Calculation
1. **X Position**: 
   - Calculate total subtree width
   - Distribute children evenly within width
   - Center children under parent
   - Formula: `parentX - totalWidth/2 + accumulated width + childWidth/2`

2. **Y Position**:
   - Simple incremental: `parentY + levelGap`
   - Same Y for all nodes at same level

### Tree Rebuild Process
When children are loaded:
1. Update parent's `childs` data
2. Recalculate all subtree widths
3. Build tree from root down
4. Reposition all affected nodes
5. Generate new edges
6. Animate view to focus on expanded area

---

## Styling

**File:** `objective-tree-view.module.scss`

**Key Classes:**
- `.objectiveTreeView`: Main container
- `.minimapWrapper`: ReactFlow wrapper
- `.objectiveNode`: Individual node styling
- `.objectiveNodeContainer`: Node with expand button
- `.showChildNodeBtn`: Expand/collapse button
- `.loadingChild`: Loading state styling
- `.controls`: Custom control buttons styling

**SCSS Features:**
- Modular scoping
- Responsive design
- Animation transitions
- Lock state styling

---

## Dependencies

- `@xyflow/react`: Tree visualization engine
- `react-use`: Async state management
- `lodash`: Utility functions
- `@mui/material`: UI components
- `@bosch/react-frok`: Design system
- `@ramonak/react-progress-bar`: Progress visualization

---

## Usage Example

```tsx
<ObjectiveTreeView
  cycle={currentCycle}
  rootObjectives={objectives}
  gapXNode={250}
  levelGap={300}
  loading={isLoading}
/>
```

---

## Performance Considerations

1. **Lazy Loading**: Children loaded on-demand
2. **Memoization**: Components wrapped with `memo()`
3. **Callback Optimization**: Uses `useCallback` for stable references
4. **State Batching**: Updates batched in single setState calls
5. **Efficient Recalculation**: Only recalculates affected subtrees

---

## Future Enhancements

- [ ] Collapse functionality for individual nodes
- [ ] Save/restore expansion state
- [ ] Search and highlight nodes
- [ ] Export tree as image
- [ ] Minimap with node highlighting
- [ ] Custom node templates
- [ ] Drag and drop to reorganize
