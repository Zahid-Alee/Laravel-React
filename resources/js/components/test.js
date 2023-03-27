import React from 'react';
import { createRoot } from 'react-dom/client';

export default function HelloReact() {
  return (
    <h1>hello from react</h1>
  );
}

const container = document.getElementById('hello-react');
let root;

if (container) {
  if (!root) {
    root = createRoot(container);
    root.render(<HelloReact />);
  } else {
    root.render(<HelloReact />);
  }
}
