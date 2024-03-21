import * as React from 'react';
import PropTypes from 'prop-types';
import { forwardRef, ReactNode, RefObject  } from 'react'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

interface MainCardProps{
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode;
  content?: boolean;
  contentSX?: Object;
  elevation?: number;
  shadow?: boolean;
  sx?: Object;
  title?: string;
  others?: object;

}
const MainBasicCard = forwardRef<HTMLDivElement, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      elevation,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref: RefObject<HTMLDivElement> | ((instance: HTMLDivElement | null) => void) | null
  ) => {
  return (
    <Card elevation={elevation || 0} ref={ref} sx={{ minWidth: 275, ...sx }}  {...others}> 
       {content && children && <CardContent sx={contentSX}>{children}</CardContent>} 
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
);


export default MainBasicCard;