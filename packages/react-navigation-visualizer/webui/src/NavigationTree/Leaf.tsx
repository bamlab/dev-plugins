import styled from '@emotion/styled';
import { Typography } from 'antd';
import React from 'react';

export const Leaf = ({
  title,
  isSelectedTab,
  color,
}: {
  title: string;
  isSelectedTab?: boolean;
  color: string;
}) => {
  const Wrapper = isSelectedTab ? SelectedLeafContainer : React.Fragment;
  return (
    <Wrapper color={color}>
      <LeafContainer
        color={color}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <LeafTitle isSelected={isSelectedTab}>{title}</LeafTitle>
      </LeafContainer>
    </Wrapper>
  );
};

const LeafContainer = styled.div<{ color: string }>(({ color }) => ({
  display: 'flex',
  flexGrow: 1,
  borderRadius: 4,
  backgroundColor: color,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  cursor: 'default',
}));

export const SelectedLeafContainer = styled.div<{ color: string }>(({ color }) => ({
  display: 'flex',
  flexGrow: 1,
  padding: 4,
  border: 'dashed',
  borderColor: color,
  borderRadius: 4,
  borderWidth: 2,
}));

const LeafTitle = styled(Typography.Text)<{ isSelected?: boolean }>(({ isSelected }) => ({
  color: 'white',
  textDecoration: isSelected ? 'underline' : 'none',
}));
