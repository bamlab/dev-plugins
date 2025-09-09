import styled from '@emotion/styled';
import { Button, Checkbox, Layout, Typography } from 'antd';
import { toPng } from 'html-to-image';
import * as React from 'react';

import { Sidebar } from '../Sidebar';
import { Title4 } from '../Typography';
import type { StoreType } from '../types';
import { NavigationNode } from './NavigationNode';
import { NavigationTreeLegend } from './NavigationTreeLegend';

type Props = StoreType;

export function NavigationTree({ logs }: Props) {
  const [isParamsVisible, setIsParamsVisible] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const currentNavigationItem = logs[logs.length - 1];

  const currentNavigationItemState = currentNavigationItem?.state;

  const hasCurrentItem = !!currentNavigationItem && currentNavigationItemState;

  const handleScreenshot = async () => {
    if (!containerRef.current) return;

    try {
      const options = {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        width: containerRef.current.scrollWidth,
        height: containerRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
      };

      // Create download link
      const link = document.createElement('a');
      link.href = await toPng(containerRef.current, options);
      link.download = `navigation-tree-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  };

  return (
    <Layout>
      <Layout.Content style={{ height: '100vh', overflow: 'auto', paddingBottom: '60px' }}>
        <Container ref={containerRef}>
          {logs.toReversed().map((log, index) => (
            <HalfContainer key={logs.length - index}>
              <Typography>Navigation state n°{logs.length - index}</Typography>
              <Spacer />
              <HalfContent>
                {log.state && log.state.routes[0] && log.state.routes[0].state && (
                  <NavigationNode
                    name={log.state.routes[0].name}
                    state={log.state.routes[0].state}
                    parentColor={generateColor(log.state.key)}
                    isParamsVisible={isParamsVisible}
                  />
                )}
              </HalfContent>
            </HalfContainer>
          ))}
        </Container>
      </Layout.Content>
      {hasCurrentItem ? (
        <Sidebar
          TopElement={
            <>
              <Title4>Actions</Title4>
              <Spacer />
              <Button.Group>
                <Button type="primary" onClick={handleScreenshot}>
                  📸 Download state history
                </Button>
              </Button.Group>
              <Spacer />
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Checkbox
                  checked={isParamsVisible}
                  onChange={(e) => setIsParamsVisible(e.target.checked)}
                />
                <Spacer />
                <Typography.Text>Show navigation params</Typography.Text>
              </div>
              <Title4>Legend</Title4>
              <NavigationTreeLegend />
            </>
          }
          action={currentNavigationItem.action}
          state={currentNavigationItem.state}
          stack={currentNavigationItem.stack}
        />
      ) : null}
    </Layout>
  );
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row-reverse',
  height: '100%',
  overflow: 'auto',
  overflowX: 'scroll',
  flex: 1,
});

const HalfContainer = styled.div({
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'center',
  overflow: 'auto',
  height: '100%',
  minWidth: '35vw',
});

const HalfContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  padding: 12,
});

const Spacer = styled.div({
  height: 4,
  width: 4,
});

const colorMap: Record<string, string> = {};
let currentIndex = 0;

const colorList = [
  '#EF5350',
  '#EC407A',
  '#AB47BC',
  '#7E57C2',
  '#5C6BC0',
  '#42A5F5',
  '#29B6F6',
  '#26C6DA',
  '#26A69A',
  '#66BB6A',
];

export const generateColor = (key: string) => {
  if (colorMap[key]) {
    return colorMap[key];
  }

  currentIndex = (currentIndex + 1) % colorList.length;
  const newColor = colorList[currentIndex];

  colorMap[key] = newColor;

  return newColor;
};
