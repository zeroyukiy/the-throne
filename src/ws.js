let ws = new WebSocket("ws://localhost:8000/ws");
// const connected

export function getWebsocket() {
  if (ws instanceof WebSocket && ws !== "") {
    console.log("already init");
    return ws;
  } else {
    ws = new WebSocket("ws://localhost:8000/ws");
    return ws;
  }
}

export function setWebsocket() {
  ws = new WebSocket("ws://localhost:8000/ws");
}

export let open = false;

ws.onopen = () => {
  console.log("open :>> ");
  open = true;
};

export const EventType = {
  Join: 0,
  Leave: 1,
  Message: 2,
};
