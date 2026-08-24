/* oxlint-disable react/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';

import { DashboardPage } from '../pages/DashboardPage';
import { FocusPage } from '../pages/FocusPage';
import { PageFallback } from '../components/ui/PageFallback';

// Lazy-loaded routes for performance & code-splitting
const GoalsPageLazy = lazy(() =>
  import('../pages/GoalsPage').then((m) => ({ default: m.GoalsPage }))
);
const PlannerPageLazy = lazy(() =>
  import('../pages/PlannerPage').then((m) => ({ default: m.PlannerPage }))
);
const HistoryPageLazy = lazy(() =>
  import('../pages/HistoryPage').then((m) => ({ default: m.HistoryPage }))
);
const AnalyticsPageLazy = lazy(() =>
  import('../pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage }))
);
const ReviewsPageLazy = lazy(() =>
  import('../pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage }))
);
const SettingsPageLazy = lazy(() =>
  import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'goals',
        element: (
          <Suspense fallback={<PageFallback />}>
            <GoalsPageLazy />
          </Suspense>
        ),
      },
      {
        path: 'planner',
        element: (
          <Suspense fallback={<PageFallback />}>
            <PlannerPageLazy />
          </Suspense>
        ),
      },
      {
        path: 'focus',
        element: <FocusPage />,
      },
      {
        path: 'history',
        element: (
          <Suspense fallback={<PageFallback />}>
            <HistoryPageLazy />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageFallback />}>
            <AnalyticsPageLazy />
          </Suspense>
        ),
      },
      {
        path: 'reviews',
        element: (
          <Suspense fallback={<PageFallback />}>
            <ReviewsPageLazy />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageFallback />}>
            <SettingsPageLazy />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
