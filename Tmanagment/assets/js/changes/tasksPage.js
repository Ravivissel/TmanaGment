
    $(document).ready(function() {

        // Default Datatable
        $('#datatable').DataTable();

        //Buttons examples
        var table = $('#datatable-buttons').DataTable({
            lengthChange: false,
            buttons: ['copy', 'excel', 'pdf']
        });

        // Key Tables

        $('#key-table').DataTable({
            keys: true
        });

        // Responsive Datatable
        $('#responsive-datatable').DataTable();

        // Multi Selection Datatable
        $('#selection-datatable').DataTable({
            select: {
                style: 'multi'
            }
        });
        var counter = 1;

        $('#datatable').on( 'hover', function () {
            t.row.add( [
                counter +'.1',
                counter +'.2',
                counter +'.3',
                counter +'.4',
                counter +'.5'
            ] ).draw( false );

            counter++;
        } );

        // Automatically add a first row of data
        $('#datatable').click();
        table.buttons().container()
            .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');
    } );
