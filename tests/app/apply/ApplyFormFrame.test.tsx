import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import ApplyFormFrame from '@/app/apply/components/ApplyFormFrame';

const FORM_ORIGIN = 'https://forms.test';
const CODE = `<iframe src="${FORM_ORIGIN}/form/key" title="Application"></iframe>`;

const renderFrame = () => {
  const { container } = render(<ApplyFormFrame code={CODE} />);
  return container.querySelector('iframe') as HTMLIFrameElement;
};

const post = (data: unknown, origin: string, source: Window | null) =>
  act(() => {
    window.dispatchEvent(new MessageEvent('message', { data, origin, source }));
  });

const submitted = { source: 'fch-embed-form', type: 'submitted' };

describe('ApplyFormFrame submission tracking', () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  afterEach(() => {
    delete window.gtag;
  });

  it('sends application_submitted when the form reports a confirmed submission', () => {
    const frame = renderFrame();

    post(submitted, FORM_ORIGIN, frame.contentWindow);

    expect(window.gtag).toHaveBeenCalledOnce();
    expect(window.gtag).toHaveBeenCalledWith('event', 'application_submitted');
  });

  it('forwards nothing else the message carries', () => {
    const frame = renderFrame();

    post({ ...submitted, email: 'applicant@example.test', submission_uid: 'abc' }, FORM_ORIGIN, frame.contentWindow);

    expect(window.gtag).toHaveBeenCalledWith('event', 'application_submitted');
  });

  it('ignores the message from any other origin', () => {
    const frame = renderFrame();

    post(submitted, 'https://evil.test', frame.contentWindow);

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('ignores the message from any other window', () => {
    renderFrame();

    post(submitted, FORM_ORIGIN, window);

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('does not count the height and scroll messages as submissions', () => {
    const frame = renderFrame();

    post({ source: 'fch-embed-form', type: 'resize', height: 900 }, FORM_ORIGIN, frame.contentWindow);
    post({ source: 'fch-embed-form', type: 'scroll', top: 0 }, FORM_ORIGIN, frame.contentWindow);

    expect(window.gtag).not.toHaveBeenCalled();
  });
});
