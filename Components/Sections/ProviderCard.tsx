import React from 'react';
import {Button, Card} from 'react-native-paper';
import {SamagraScaller} from '../../Utilities/CustomMethods';
import {TextComponet} from '../Elements/TextComponet';
import {ProviderCardSkeleton} from '../Skeletons/ProviderCardSkeleton';

interface ProviderCardProps {
  titleName: string;
  image: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  titleName = 'Ramesh Laundry',
  image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST3aRXDlXx1L3mmuPQnoqmi_qVh-e9M8bNyw&s',
}) => {
  return (
    <>
      <Card
        style={{
          margin: SamagraScaller({
            value: 18,
            scaleBy: 'average',
          }),
          backgroundColor: 'white',
          padding: SamagraScaller({
            value: 20,
            scaleBy: 'height',
          }),
          elevation: 0,

          borderRadius: SamagraScaller({
            value: 10,
            scaleBy: 'average',
          }),
        }}>
        <Card.Content>
          <Card.Cover
            source={{
              uri: image,
            }}
          />
          <TextComponet
            customStyle={{
              marginBottom: SamagraScaller({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            title={titleName}
            fontVariant="heavy"
            lineHeight={19}
            fontSize={20}></TextComponet>
          <TextComponet
            customStyle={{
              marginBottom: SamagraScaller({
                value: 5,
                scaleBy: 'average',
              }),
            }}
            title={'label'}
            fontVariant="regular"
            lineHeight={19}
            fontSize={16}></TextComponet>
        </Card.Content>
        <Card.Actions>
          <Button
            style={{
              backgroundColor: 'green',
            }}>
            Decline
          </Button>
          <Button
            style={{
              backgroundColor: 'green',
            }}>
            Accept
          </Button>
        </Card.Actions>
      </Card>
      <ProviderCardSkeleton></ProviderCardSkeleton>
    </>
  );
};
