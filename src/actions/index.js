import data from '../data/events.json';

export function initializeEvents() {
  return {
    type: 'INITIALIZE_EVENT_DATA',
    data,
  };
}
