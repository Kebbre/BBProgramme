const TASK_COLOR_MAP = {
  'Bond Bryan Design': '#00ccde',
  'Bond Bryan review': '#ff8fad',
  'CDP': '#ff8200',
  'Client Comments': '#fff229',
  'Delays': '#5cba45',
  'Undefined': '#d1c9ba'
};

const DEFAULT_SEGMENT_COLOR = '#00ccde';
const STAGE_COLOR = '#d1c9ba';
const SINGLE_EVENT_COLOR = '#5cba45';
const SINGLE_EVENT_SELECTED_COLOR = '#ff8fad';

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
