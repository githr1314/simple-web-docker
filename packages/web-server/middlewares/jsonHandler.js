module.exports = () => {
    function handleJson(json) {
        this.set('Content-Type', 'application/json');
        this.response.body = JSON.stringify(json);
    }

    return async (ctx, next) => {
        ctx.send = handleJson.bind(ctx);
        await next();
    }
}