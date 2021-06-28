import {handleError, handleTerminationSignal} from '../processHandlers';
import {mockProcessExit} from 'jest-mock-process';

describe('app', () => {
  it('handles unspecified error', async () => {
    // given
    const error = {
      name: 'unspecified',
      message: 'an error',
    };

    // then
    await expect(handleError(error)).rejects.toMatchObject(error);
  });

  it('exits the process when it does not have access to use port', async () => {
    // given
    const exitProcessMock = mockProcessExit();

    const error = {
      name: 'port no access',
      message: 'port no access',
      syscall: 'listen',
      code: 'EACCES',
    };

    // when
    await handleError(error);

    // then
    expect(exitProcessMock).toBeCalled();
  });

  it('exits the process when port already in use', async () => {
    // given
    const exitProcessMock = mockProcessExit();

    const error = {
      name: 'port in use',
      message: 'port in use',
      syscall: 'listen',
      code: 'EADDRINUSE',
    };

    // when
    await handleError(error);

    // then
    expect(exitProcessMock).toBeCalled();
  });

  it('handles unspecified error', async () => {
    // given
    const exitProcessMock = mockProcessExit();

    // when
    await handleTerminationSignal('SIGTERM');

    // then
    expect(exitProcessMock).toBeCalled();
  });
});
