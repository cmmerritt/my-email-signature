import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ComponentType, PropsWithChildren } from 'react';

const cache = createCache({ key: 'css' });
cache.compat = true;

export function withEmotionCache<P>(Component: ComponentType<PropsWithChildren<P>>): ComponentType<PropsWithChildren<P>> {
  return function EmotionCacheWrapper(props: PropsWithChildren<P>) {
    return (
      <CacheProvider value={cache}>
        <Component {...props} />
      </CacheProvider>
    );
  };
}