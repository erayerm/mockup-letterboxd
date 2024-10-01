import withSvgr from 'next-plugin-svgr';

export default withSvgr({
    webpack(config, options) {
        return config;
    },
});
