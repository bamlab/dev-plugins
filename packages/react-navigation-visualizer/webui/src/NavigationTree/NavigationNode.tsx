import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

import { NavigationState } from '../types';
import { Leaf } from './Leaf';
import { generateColor } from './NavigationTree';

export const NavigationNode = ({
  name,
  state,
  parentColor,
}: {
  name: string;
  state: NavigationState;
  parentColor: string;
}) => {
  const [isClosed, setIsClosed] = React.useState(false);

  const routes = state.routes;
  if (!routes || !routes.length) {
    return <Leaf title={name} color={parentColor} />;
  }

  const color = generateColor(state.key);

  const StackWrapper = state.type === 'tab' ? TabContainer : React.Fragment;

  if (isClosed) {
    return <ClosedNode name={name} color={color} openNode={() => setIsClosed(false)} />;
  }

  return (
    <NodeContainer
      color={color}
      onClick={(e) => {
        setIsClosed(true);
        e.stopPropagation();
      }}>
      <StackWrapper>
        {routes.toReversed().map((route, index) => (
          <React.Fragment key={route.key}>
            {route.state?.routes && route.state.routes.length ? (
              <NavigationNode name={route.name} state={route.state} parentColor={color} />
            ) : (
              <Leaf
                title={route.name}
                isSelectedTab={
                  state.type === 'tab' && state.index === state.routes.length - 1 - index
                }
                color={color}
              />
            )}
            {index < routes.length - 1 ? <Spacer /> : null}
          </React.Fragment>
        ))}
      </StackWrapper>
      <NodeTitle color={color}>{name}</NodeTitle>
    </NodeContainer>
  );
};

const ClosedNode = ({
  name,
  color,
  openNode,
}: {
  name: string;
  color: string;
  openNode: () => void;
}) => {
  return (
    <NodeContainer
      color={color}
      style={{ borderColor: color }}
      onClick={(e) => {
        openNode();
        e.stopPropagation();
      }}
      isClosed>
      <ClosedNodeTitle color={color}>{name}</ClosedNodeTitle>
    </NodeContainer>
  );
};

export const NodeContainer = styled.div<{ color: string; isClosed?: boolean }>(
  ({ color, isClosed }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 1,
    border: 'solid',
    borderColor: color,
    borderTopWidth: isClosed ? 1 : 0,
    borderTopLeftRadius: isClosed ? 4 : 0,
    borderTopRightRadius: isClosed ? 4 : 0,
    padding: 8,
    paddingTop: 4,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    ':hover:not(:has(:hover))': {
      backgroundColor: `${color}30`,
    },
  })
);

export const NodeTitle = styled(Typography)<{ color: string }>(({ color }) => ({
  alignSelf: 'flex-start',
  color,
}));

const ClosedNodeTitle = styled(Typography)<{ color: string }>(({ color }) => ({
  alignSelf: 'center',
  color,
}));

const Spacer = styled.div({
  height: 4,
  width: 4,
});

const TabContainer = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});
