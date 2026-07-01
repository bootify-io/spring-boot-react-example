import React, { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { TextEncoder } from 'util';
import { render, RenderResult } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router';


declare global {
  function renderWithRouter(ui: ReactNode): RenderResult
}

globalThis.TextEncoder = TextEncoder;

globalThis.renderWithRouter = (ui: ReactNode) => {
  const router = createBrowserRouter([
    { path: '', element: ui }
  ]);
  return {
    ...render(<RouterProvider router={router} />)
  };
};

jest.mock('react-i18next', () => ({
  Trans: () => 'Trans',
  useTranslation: () => ({
    t: (key: string) => key
  })
}));
