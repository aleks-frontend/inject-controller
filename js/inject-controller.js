function InjectController() {
    this.tableSrcTop = document.querySelector('.js-table-src-top');
    this.tableSrcBottom = document.querySelector('.js-table-src-bottom');
    this.sectionTop = document.querySelector('.section--top');
    this.sectionBottom = document.querySelector('.section--bottom');
}

InjectController.inject = function() {
    const injectInstance = new InjectController();
    injectInstance.resetTables();
    injectInstance.injectTable1();
    injectInstance.injectTable2();
};

InjectController.prototype.injectTable1 = function() {
    let availableSpace;
    const self = this;

    const table = document.createElement('table');
    table.classList.add('table', 'table--primary');
    this.sectionTop.appendChild(table);

    let table2 = document.createElement('table');
    table2.classList.add('table');

    const rowsSrc = this.tableSrcTop.querySelectorAll('.js-table-src-row');
    rowsSrc.forEach(rowSrc => {
        const row = document.createElement('tr');

        row.innerHTML = rowSrc.innerHTML;

        availableSpace = self.sectionTop.offsetHeight - table.offsetHeight;
        table.appendChild(row);
        if ( availableSpace < row.offsetHeight || self.sectionTop.classList.contains('full') ) {
            self.sectionTop.classList.add('full');
            row.remove();

            if ( self.sectionBottom.querySelector('.table') == null ) self.sectionBottom.appendChild(table2);
            table2.appendChild(row);
        }
    });
};

InjectController.prototype.injectTable2 = function() {
    let availableSpace;
    const topTableHeight = document.querySelector('.table--primary').offsetHeight;
    const self = this;

    const table = document.createElement('table');
    table.classList.add('table', 'table--secondary');
    self.sectionTop.appendChild(table);

    let table2 = document.createElement('table');
    table2.classList.add('table');
    self.sectionBottom.appendChild(table2);

    const rowsSrc = this.tableSrcBottom.querySelectorAll('.js-table-src-row');
    rowsSrc.forEach(rowSrc => {
        const row = document.createElement('tr');

        row.innerHTML = rowSrc.innerHTML;

        availableSpace = self.sectionTop.offsetHeight - table.offsetHeight - topTableHeight;
        table.appendChild(row);
        if ( availableSpace < row.offsetHeight || self.sectionTop.classList.contains('full') ) {
            self.sectionTop.classList.add('full');
            row.remove();

            if ( self.sectionBottom.querySelector('.table') == null ) self.sectionBottom.appendChild(table2);
            table2.appendChild(row);
        }
    });
};

InjectController.prototype.resetTables = function() {
    this.sectionTop.innerHTML = '';
    this.sectionTop.classList.remove('full');
    this.sectionBottom.innerHTML = '';
};