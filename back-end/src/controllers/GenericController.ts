class GenericController {
    generatePagination(params: any) {
        try {
            const limit = params.limit ? parseInt(params.limit) : 10,
                page = params.page ? parseInt(params.page) - 1 : 0;

            return [limit, page];
        } catch (err) {
            console.log(err)
            return [10, 0];
        }
    }
    generateOrder(params: any) {
        let order = ["id", "ASC"];
        if (params.order) {
            order = params.order.split(",");
        }
        return {
            order: [order],
        };
    }
}

export default GenericController;