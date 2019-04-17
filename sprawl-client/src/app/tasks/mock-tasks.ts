import { Task } from './task';

export const TASKS: Task[] = [
    {
        taskId: '92d1d24a-c38e-4e1b-bbb4-f0e526a6892c',
        owner: '1c373b98-4d3b-40d9-9820-5e8b397a66ca',
        title: 'Complete User Story #1a32ef',
        body: 'Implement Task API integration into Angular Client',
        expDuration: 100,
        workedTime: 0,
        isFinished: false,
        createdAt: '2019-04-17T01:32:49.000+0000',
        updatedAt: '2019-04-17T01:32:49.000+0000',
        lastWorkStartAt: null,
        tags: [
          'Sprawl',
          'Sprint3'
        ]
      },
      {
        taskId: 'cef534a7-fb1d-4049-b650-cf36ffd356c5',
        owner: '1c373b98-4d3b-40d9-9820-5e8b397a66ca',
        title: 'Complete CS252 Project 6',
        body: 'Finish alpha build demo by April 17th for extra credit',
        createdAt: '2019-04-17T01:32:43.000+0000',
        updatedAt: '2019-04-17T01:32:43.000+0000',
        lastWorkStartAt: null,
        expDuration: 200,
        workedTime: 36,
        isFinished: false,
        tags: [
          'CS252',
          'Homework'
        ]
      }
];
