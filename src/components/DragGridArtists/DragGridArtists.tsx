import React from 'react';

import { DragCard } from '@components/DragCard';
import { ThemeType } from '@context/ThemeContext';
import { IArtistsModel } from '@store/models/ArtistsModel';
import { Card } from '@ui-components/Card';

type TDragGridArtistsProps = {
  artists: IArtistsModel[];
  theme: ThemeType;
};

const DragGridArtists: React.FC<TDragGridArtistsProps> = ({
  artists,
  theme,
}) => (
  <>
    {artists.map((item) => (
      <DragCard id={item.id} key={item.id} theme={theme}>
        <Card
          key={item.id}
          {...item}
          id={item.id}
          image={item.paint || undefined}
          theme={theme}
          pathTo={`/artists/${item.id}`}
        />
      </DragCard>
    ))}
  </>
);

export default DragGridArtists;
