onload = function () {

    var data =

        {
            results:
                [
                    {
                        task:
                            {
                                title: "task title",
                                end_date: "15/01/18",
                                status: "in_progress"
                            },
                        project:
                            {
                                name: "project name"
                            },
                        employee: {
                            first_name: "emp first name"

                        }
                    }, {

                        task:
                            {
                                title: "task title",
                                end_date: "15/01/18",
                                status: "in_progress"
                            },
                        project:
                            {
                                name: "project name"
                            },
                        employee: {
                            first_name: "emp first name"

                        }
                    }, {

                        task:
                            {
                                title: "task title",
                                end_date: "15/01/18",
                                status: "in_progress"
                            },
                        project:
                            {
                                name: "project name"
                            },
                        employee: {
                            first_name: "emp first name"

                        }
                    }, {

                        task:
                            {
                                title: "task title",
                                end_date: "15/01/18",
                                status: "in_progress"
                            },
                        project:
                            {
                                name: "project name"
                            },
                        employee: {
                            first_name: "emp first name"

                        }
                    }
                ]
        };

    var templ = document.getElementById('myTasksTableBody').innerHTML;
    var renderedPage = ejs.compile(templ)(data);
    document.body.innerHTML = renderedPage;

};