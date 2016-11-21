const path = require('path');
const mock = require('mock-fs');

// eslint-disable-next-line import/no-dynamic-require
const contentApi = require(`${rootFolder}/lib/content-api`);

describe('Content API library', () => {
  afterEach(() => {
    mock.restore();
  });

  describe('#getRecordFile', () => {
    describe('when a file exists', () => {
      const slug = 'path/to/real/dir';
      const mockData = {
        title: 'foo',
        top: '!file=markdown.md',
        main: [
          {
            content: '## Heading 2',
          },
          {
            content: {
              title: 'bar',
              content: [
                {
                  content: '### Heading 3',
                },
              ],
            },
          },
        ],
      };

      before(() => {
        mock({
          [path.resolve(__dirname, '../../../content', slug)]: {
            'manifest.json': JSON.stringify(mockData),
            'markdown.md': mockData.top,
          },
        });
      });

      it('should return a JavaScript object', () => {
        const record = contentApi.getRecordFile(slug);
        return record.should.deep.equal(mockData);
      });
    });

    describe('when a file does not exist', () => {
      const slug = 'path/to/fake/dir';

      before(() => {
        mock({
          [path.resolve(__dirname, '../../../content', slug)]: {/** empty directory */},
        });
      });

      it('should return false', () => {
        const record = contentApi.getRecordFile(slug);
        return record.should.equal(false);
      });
    });
  });
});
