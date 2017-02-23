const expectComponent = require('../component-helper').expectComponent;

describe('Image component', () => {
  it('should render', () => {
    expectComponent(
      'image',
      {
        srcset: ['image-path.jpg 300w'],
        alt: 'Alternative description',
      },
      `
      <figure class="media">
        <!--[if gt IE 7]><!-->
        <img
          srcset="image-path.jpg 300w"
          alt="Alternative description"
          data-analytics="image"
          data-analytics-type="inline"
          />
        <!--<![endif]-->
        <!--[if gt IE 7]><!--><noscript><!--<![endif]-->
          <img src="image-path.jpg" alt="Alternative description" />
        <!--[if gt IE 7]><!--></noscript><!--<![endif]-->
      </figure>
      `
    );
  });

  it('should render with a caption', () => {
    expectComponent(
      'image',
      {
        srcset: ['image-path.jpg 300w'],
        alt: 'Alternative description',
        caption: 'Image **caption**',
      },
      `
      <figure class="media">
        <!--[if gt IE 7]><!-->
        <img
          srcset="image-path.jpg 300w"
          alt="Alternative description"
          data-analytics="image"
          data-analytics-type="inline"
          />
        <!--<![endif]-->
        <!--[if gt IE 7]><!--><noscript><!--<![endif]-->
          <img src="image-path.jpg" alt="Alternative description" />
        <!--[if gt IE 7]><!--></noscript><!--<![endif]-->

        <figcaption class="media__caption">
          <p>Image <strong>caption</strong></p>
        </figcaption>
      </figure>
      `
    );
  });

  it('should render with custom tracking', () => {
    expectComponent(
      'image',
      {
        srcset: ['image-path.jpg 300w'],
        alt: 'Alternative description',
        analyticsType: 'figure',
      },
      `
      <figure class="media">
        <!--[if gt IE 7]><!-->
        <img
          srcset="image-path.jpg 300w"
          alt="Alternative description"
          data-analytics="image"
          data-analytics-type="figure"
          />
        <!--<![endif]-->
        <!--[if gt IE 7]><!--><noscript><!--<![endif]-->
          <img src="image-path.jpg" alt="Alternative description" />
        <!--[if gt IE 7]><!--></noscript><!--<![endif]-->
      </figure>
      `
    );
  });
});
