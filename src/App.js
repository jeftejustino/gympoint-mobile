import React from 'react';

import createRouter from '~/routes';

export default function config() {
  const Routes = createRouter(false);

  return <Routes />;
}
