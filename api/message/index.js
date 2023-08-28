module.exports = async function (context, req) {
    context.res = {
        // status: 200, /* Defaults to 200 */
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        body: { text: "Hello from the API!" }
    };
};
