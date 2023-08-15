import React, { useState, useCallback } from 'react';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { DragCard } from '@components/DragCard';
import { ThemeType } from '@context/ThemeContext';
import { Grid } from '@ui-components/Grid';

import DragGridItem from './DragGridItem';

type TDragGridProps = {
  // Todo add Types
  // array: IArtistsStaticModel[] | IArtistsStaticByIdModel[];
  array: any[];
  theme: ThemeType;
  variant: 'author' | 'paint';
  onClickCard?: (index: number) => () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const DragGrid: React.FC<TDragGridProps> = ({
  array,
  theme,
  variant,
  onClickCard = () => {},
}) => {
  const [items, setItems] = useState(array);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      //  eslint-disable-next-line @typescript-eslint/no-shadow
      setItems((items) => {
        const oldIndex = items.map((i) => i.id).indexOf(active.id as string);
        const newIndex = items.map((i) => i.id).indexOf(over?.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  // TODO CHECK THIS
  const grid = items.map((item, index) => (
    <DragCard id={item.id} key={item.id}>
      <DragGridItem
        variant={variant}
        item={item}
        theme={theme}
        index={index}
        onClickCard={onClickCard}
      />
    </DragCard>
  ));

  const overlayCard = (
    <DragCard id={activeId as string}>
      {items.map((item, index) =>
        item.id === activeId ? (
          // TODO CHECK THIS
          <DragGridItem
            variant={variant}
            item={item}
            theme={theme}
            index={index}
            onClickCard={onClickCard}
          />
        ) : null
      )}
    </DragCard>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid>{grid}</Grid>
      </SortableContext>
      <DragOverlay adjustScale>{activeId ? overlayCard : null}</DragOverlay>
    </DndContext>
  );
};

export default DragGrid;
