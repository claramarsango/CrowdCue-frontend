import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from '../app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {
      authForm: {
        registerState: 'idle',
        loginState: 'idle',
        status: 'idle',
        registerMsg: '',
        loginMsg: '',
      },
      sessionComponent: {
        status: 'idle',
        createSessionState: 'idle',
        sessionMsg: '',
        previewSessions: [],
        session: {
          title: '',
          coverImageURL: '',
          url: '',
          currentSong: '',
          queuedSongs: [],
          admin: '',
          participants: [],
          _id: '0',
        },
        exitStatus: 'idle',
        joinStatus: 'idle',
        getSessionDetailState: 'idle',
        user: {
          id: 0,
          email: '',
          password: '',
          imageURL: '',
          inSession: '',
        },
      },
    },
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
