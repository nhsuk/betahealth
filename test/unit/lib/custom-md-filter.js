const path = require('path');
const mock = require('mock-fs');
const rewire = require('rewire');

const customMdFilter = rewire('../../../lib/custom-md-filter');

const markdownAst = [
  {
    type: 'container_warning_open',
    nesting: 1,
  },
  {
    type: 'paragraph_open',
  },
  {
    type: 'inline',
    content: 'inner text',
  },
  {
    type: 'paragraph_close',
  },
  {
    type: 'container_warning_close',
    nesting: -1,
  },
];

describe('Markdown custom filters', () => {
  afterEach(() => {
    mock.restore();
  });

  describe('#customMdFilter', () => {
    beforeEach(() => {
      mock({
        [path.resolve(__dirname, '../../../app/views/_md-filters')]: {
          'blob.nunjucks': '<div><!--content--></div>',
          'warning.nunjucks': '<div>{% if title %}<h1>{{title}}</h1>{% endif %}<!--content--></div>',
          'empty.nunjucks': '',
        },
      });
    });

    it('should set marker on filter object', () => {
      const filter = customMdFilter('!', 'blob');
      filter.marker.should.equal('!');
    });

    it('should throw an error when template is missing content placeholder', () => {
      const filter = customMdFilter('!', 'empty');
      (() => {
        filter.render(markdownAst, 0);
      }).should.throw(/requires <!--content-->/);
    });

    it('should render opening and closing HTML of filter template', () => {
      const filter = customMdFilter('!', 'blob');
      filter.render(markdownAst, 0).should.equal('<div>');
      filter.render(markdownAst, 4).should.equal('</div>');
    });

    it('should render compile HTML in Nunjucks', () => {
      const filter = customMdFilter('!', 'warning');

      const markdownAstwithAttrs = markdownAst.slice(0);
      markdownAstwithAttrs[0].info = ' warning title: Attention'; // Add filter params

      filter.render(markdownAst, 0).should.equal('<div><h1>Attention</h1>');
      filter.render(markdownAst, 4).should.equal('</div>');
    });
  });

  describe('#validate', () => {
    it('should throw when hasParams is set to true and no params are given', () => {
      const filter = customMdFilter('!', 'warning', true);

      (() => {
        filter.validate();
      }).should.throw('params must be provided if `hasParams` is enabled');
    });

    it('should return array with found instances of params specified', () => {
      const filter = customMdFilter('!', 'warning', true);

      filter.validate('warning Attention').should.be.an('array');
      filter.validate('warning Attention')[1].should.equal('Attention');
      filter.validate('warning title: Attention, subtitle: Less important').should.be.an('array');
      filter.validate('warning title: Attention, subtitle: Less important')[1].should.equal('title: Attention, subtitle: Less important');
    });
  });

  describe('#paramsToObj', () => {
    const paramsToObj = customMdFilter.__get__('paramsToObj');

    it('should return an object', () => {
      paramsToObj().should.be.an('object');
    });

    describe('single param', () => {
      it('should return an object with title prop when single param is given', () => {
        paramsToObj('Simple title').should.deep.equal({
          title: 'Simple title',
        });
      });

      it('should return an object with title prop when comma-separated and without key/value separator (colon)', () => {
        paramsToObj('Simple title, comma-separated').should.deep.equal({
          title: 'Simple title, comma-separated',
        });
      });
    });

    describe('multiple params', () => {
      it('should return an object representing string of parameters with key/value separator (colon)', () => {
        paramsToObj('title: Simple title, subtitle: Less important').should.deep.equal({
          title: 'Simple title',
          subtitle: 'Less important',
        });
      });
    });
  });
});
