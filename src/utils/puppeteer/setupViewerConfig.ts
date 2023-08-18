import { InitialConfig, State } from '../../model';

/**
 * Setups Olectio Viewer Config in the browser
 * @param viewerInitialConfig initial config to apply serialized as string
 * @returns current State
 */
const setupViewerConfig = (viewerInitialConfig: string): State => {
  const config = JSON.parse(viewerInitialConfig) as InitialConfig;
  config.eventHandler = window.olectioEventHandler;
  window.olectioApi = window.olectioViewer(config);
  window.olectioSetDispatcher(window.olectioApi.dispatch);
  window.olectioSetState(window.olectioApi.state);
  return window.olectioApi.state;
};

export default setupViewerConfig;
