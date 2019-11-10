import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Learn as LearnView,
  Stats as StatsView,
  Help as HelpView,
  AccountSettings as AccountSettingsView,
  About as AboutView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/learn"
      />
      <RouteWithLayout
        component={LearnView}
        exact
        layout={MainLayout}
        path="/learn"
      />
      <RouteWithLayout
        component={StatsView}
        exact
        layout={MainLayout}
        path="/stats"
      />
      <RouteWithLayout
        component={HelpView}
        exact
        layout={MainLayout}
        path="/help"
      />
      <RouteWithLayout
        component={AccountSettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={AboutView}
        exact
        layout={MainLayout}
        path="/About"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
