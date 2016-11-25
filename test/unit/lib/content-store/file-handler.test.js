const path = require('path');
const mock = require('mock-fs');

// eslint-disable-next-line import/no-dynamic-require
const fileHandler = require(`${rootFolder}/lib/content-store/file-handler`);

describe('File Handler library', () => {
  afterEach(() => {
    mock.restore();
  });

  describe('#get', () => {
    describe('when a file exists', () => {
      const slug = 'path/to/real/dir';

      describe('for a basic record', () => {
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
            [path.resolve(__dirname, '../../../../content', slug)]: {
              'manifest.json': JSON.stringify(mockData),
              'markdown.md': mockData.top,
            },
          });
        });

        it('should return a JavaScript object', () => {
          return fileHandler.get(slug).should.become(mockData);
        });
      });

      describe('for a parent record', () => {
        const childMockData = {
          guide: true,
        };
        const parentMockData = {
          guide: true,
          meta: {
            children: [
              { slug: 'child-1' },
            ],
          },
        };

        before(() => {
          const fileDir = path.resolve(__dirname, '../../../../content', slug);

          mock({
            [path.resolve(fileDir, 'manifest.json')]: JSON.stringify(childMockData),
            [path.resolve(fileDir, '..', 'manifest.json')]: JSON.stringify(parentMockData),
            [path.resolve(fileDir, '..', 'child-1', 'manifest.json')]: JSON.stringify(childMockData),
          });
        });

        it('should return a JavaScript object', () => {
          const result = Object.assign({}, childMockData);
          result.meta = {
            parent: Object.assign({}, parentMockData),
            siblings: [
              {
                guide: true,
                slug: 'child-1',
              },
            ],
          };

          return fileHandler.get(slug).should.become(result);
        });
      });
    });

    describe('when a file does not exist', () => {
      const slug = 'path/to/fake/dir';

      before(() => {
        mock({
          [path.resolve(__dirname, '../../../../content', slug)]: {/** empty directory */},
        });
      });

      it('should be rejected', () => {
        return fileHandler.get(slug).should.be.rejected;
      });
    });
  });
});
