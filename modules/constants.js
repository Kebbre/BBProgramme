const TASK_COLOR_MAP = {
  'Bond Bryan Design': '#ccf5f2',
  'Bond Bryan review': '#00ccde',
  'CDP': '#2b7a91',
  'Client Comments': '#d1c9ba',
  'Delays': '#b4b4b4ff',
  'Undefined': '#8c8280'
};

const DEFAULT_SEGMENT_COLOR = '#ccf5f2';
const STAGE_COLOR = '#ffd6d6';
const SINGLE_EVENT_COLOR = '#41b74bff';
const SINGLE_EVENT_SELECTED_COLOR = '#41b74bff';

const colorConstants = Object.freeze({
  TASK_COLOR_MAP: Object.freeze({ ...TASK_COLOR_MAP }),
  DEFAULT_SEGMENT_COLOR,
  STAGE_COLOR,
  SINGLE_EVENT_COLOR,
  SINGLE_EVENT_SELECTED_COLOR
});

export default colorConstants;
export {
  TASK_COLOR_MAP,
  DEFAULT_SEGMENT_COLOR,
  STAGE_COLOR,
  SINGLE_EVENT_COLOR,
  SINGLE_EVENT_SELECTED_COLOR
};
