import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props:any) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 280 500'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='136' cy='127' r='128' />
    <rect x='0' y='284' rx='0' ry='0' width='280' height='0' />
    <rect x='0' y='294' rx='16' ry='16' width='280' height='24' />
    <rect x='0' y='344' rx='0' ry='0' width='280' height='88' />
    <rect x='0' y='450' rx='14' ry='14' width='95' height='30' />
    <rect x='128' y='445' rx='14' ry='14' width='152' height='45' />
  </ContentLoader>
);

export default Skeleton;
