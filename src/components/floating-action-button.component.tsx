import { Fab, Stack } from '@mui/material';
import { ReactElement } from 'react';

type FloatingActionButtonProps = {
  icon: ReactElement,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
};

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  return <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
  <Fab color="primary" aria-label="add"
    style={{
      alignSelf: 'flex-end',
    }}
    onClick={props.onClick}>
      {props.icon}
    {/* <AddIcon /> */}
  </Fab>
</Stack>;
}
export default FloatingActionButton;