import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';
import rename from 'gulp-rename';
import cheerio from 'gulp-cheerio';

export const sprite = () => {
  return app.gulp
    .src(`${app.path.src.svgicons}`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      svgmin({
        plugins: [
          {
            removeDesc: true,
          },
          {
            removeComments: true,
          },
          {
            removeViewBox: false,
          },
        ],
      }),
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      cheerio({
        run: ($) => {
          $('path').removeAttr('fill');
          // $('g').removeAttr('fill');
        },
        parserOptions: { xmlMode: true },
      }),
    )
    .pipe(rename('icons.svg'))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/img/icons`));
};
