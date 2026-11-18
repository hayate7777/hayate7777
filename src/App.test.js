import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

jest.mock('./lib/analytics', () => ({
  initClarity: jest.fn(),
  trackPageView: jest.fn(),
  trackContactSubmit: jest.fn(),
  trackGithubClick: jest.fn(),
  trackLinkedinClick: jest.fn(),
}));

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('switches the full portfolio between English and Japanese', async () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );

  expect(await screen.findByLabelText('Your Name')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Switch to Japanese' }));

  expect(await screen.findByLabelText('お名前')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '職務経歴' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '開発プロジェクト' })).toBeInTheDocument();
  expect(screen.getByText('プログラミング言語')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '学歴・資格' })).toBeInTheDocument();
  expect(screen.getByText('AI・生体認証プラットフォーム')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('ja');

  fireEvent.click(screen.getAllByRole('button', { name: /詳細を見る/ })[0]);
  expect(await screen.findByText('主な取り組み・アーキテクチャ：')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'ダイアログを閉じる' }));

  fireEvent.click(screen.getByRole('button', { name: 'Switch to English' }));

  expect(await screen.findByLabelText('Your Name')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('en');
});
