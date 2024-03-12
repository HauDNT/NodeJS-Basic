// Trong Middleware ta tạo ra một biến locals
// Biến này chỉ có tác dụng trong 1 request và nó không ảnh hưởng đến các thành phần khác
// Ta có thể dùng nó để render ra các views.

module.exports = function sortMiddleware(req, res, next) {
    // Tạo mới ra một object có tên là _sort:
    // Khi dùng res.locals thì biến này sẽ tự có ở trong view
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    // Nếu request truyền lên có chức năng 'sort' thì gán lại các giá trị:
    // Có 2 cách viết: viết thông thường và dùng assign
    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;

        // Object assign hợp nhất các object từ phải sang trái
        // nếu trùng key thì nó sẽ ghi đè.
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
};
