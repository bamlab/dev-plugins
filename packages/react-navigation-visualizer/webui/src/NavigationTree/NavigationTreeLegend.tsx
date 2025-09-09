import { Leaf, SelectedLeafContainer } from './Leaf';
import { NodeContainer, NodeTitle } from './NavigationNode';

const legendRed = '#EF5350';

export const NavigationTreeLegend = () => {
  return (
    <div style={{ padding: 12 }}>
      <NodeContainer color={legendRed}>
        <Leaf title="Screen" color={legendRed} />
        <div style={{ height: 4 }} />
        <NodeTitle color={legendRed}>Stack Navigator</NodeTitle>
      </NodeContainer>
      <div style={{ height: 12 }} />
      <NodeContainer color={legendRed}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Leaf title="Unselected Tab" color={legendRed} />
          <div style={{ width: 4 }} />
          <SelectedLeafContainer color={legendRed}>
            <Leaf title="Selected Tab" color={legendRed} />
          </SelectedLeafContainer>
        </div>
        <div style={{ height: 4 }} />
        <NodeTitle color={legendRed}>Tab Navigator</NodeTitle>
      </NodeContainer>
    </div>
  );
};
