package com.example.alexey.universaltable;

import android.app.Activity;
import android.content.Context;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.Gravity;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.Toast;

import java.util.ArrayList;

/**
 * Created by alexey on 24.03.16.
 */

public class Table implements ITable {
    private int columns = 0;
    private ArrayList<Object[]> rows;
    private ArrayList<Row> rowsDisplayed;

    public Table() {
        rows = new ArrayList<Object[]>();
        rowsDisplayed = new ArrayList<Row>();
    }

    @Override
    public void addRow(Object[] values) {
        if (columns == 0)
            columns = values.length;
        else if (columns != values.length)
            throw new ArrayStoreException("Columns count mismatch");

        rows.add(values);
    }

    @Override
    public void deleteRow(int number) {
        rows.remove(number);
        if (rows.size() == 0)
            columns = 0;
    }

    @Override
    public Iterable getRows() {
        return (ArrayList<Iterable>)rows.clone();
    }

    @Override
    public int size() {
        return rows.size();
    }

    public int getColumns() {
        return columns;
    }

    @Override
    public void updateCell(int row, int column, Object value) {
        rows.get(row)[column] = value;
    }

    @Override
    public ArrayList<Integer> indexOf(Object value, int column) {
        ArrayList<Integer> matches = new ArrayList<Integer>();

        for (int i = 0; i < rows.size(); ++i)
            if (rows.get(i)[column].equals(value))
                matches.add(i);

        return matches;
    }

    public void createRow(Activity context) {
        final TableLayout listView = (TableLayout)context.findViewById(R.id.listView);
        EditText newRowInput = (EditText)context.findViewById(R.id.newRow);
        String text = newRowInput.getText().toString();
        String[] values = text.split(" ");

        try {
            this.addRow(values);

            final Row visualizer = new Row(values);
            rowsDisplayed.add(visualizer);
            final TableRow row = visualizer.createRowVisualization(context);
            visualizer.setOnCrossClick(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int pos = rowsDisplayed.indexOf(visualizer);
                    Table.this.deleteRow(pos);
                    rowsDisplayed.remove(pos);
                    listView.removeViewAt(pos);
                }
            });
            listView.addView(row);

            newRowInput.setText("");
        } catch (ArrayStoreException e) {
            Toast.makeText(context, e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    public void showRow(int index) {
        rowsDisplayed.get(index).show();
    }

    public void hideRow(int index) {
        rowsDisplayed.get(index).hide();
    }



    private class Row {
        private TableRow view;
        private String[] values;
        private EditText[] cells;
        private ImageView cross;

        public Row(String[] values) {
            this.values = values;
        }

        public TableRow createRowVisualization(Context context) {
            view = new TableRow(context);

            cells = new EditText[values.length];

            for (int i = 0; i < values.length; ++i) {
                cells[i] = new EditText(context);
                cells[i].setText(values[i]);
                cells[i].setId(View.generateViewId());
                view.addView(cells[i]);
            }

            cross = new ImageView(context);
            cross.setImageResource(R.drawable.cross);
            view.addView(cross);

            setOnTextChanged();

            view.setGravity(Gravity.CENTER_VERTICAL);
            return view;
        }

        public void setOnCrossClick(View.OnClickListener onCrossClick) {
            cross.setClickable(true);
            cross.setOnClickListener(onCrossClick);
        }

        private void setOnTextChanged() {
            final int pos = Table.this.rowsDisplayed.indexOf(this);

            for (int i = 0; i < cells.length; ++i) {
                final int col = i;
                cells[i].addTextChangedListener(new TextWatcher() {
                    @Override
                    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                    }

                    @Override
                    public void onTextChanged(CharSequence s, int start, int before, int count) {

                    }

                    @Override
                    public void afterTextChanged(Editable s) {
                        Row visualizer = Table.this.rowsDisplayed.get(pos);
                        Table.this.updateCell(pos, col, cells[col].getText().toString());
                        values[col] = cells[col].getText().toString();
                    }
                });
            }
        }

        public void show() {
            view.setVisibility(View.VISIBLE);
        }

        public void hide() {
            view.setVisibility(View.GONE);
        }
    }
}

interface ITable {
    void addRow(Object[] values);
    void deleteRow(int number);
    void updateCell(int row, int column, Object value);
    Iterable getRows();
    int size();
    ArrayList<Integer> indexOf(Object value, int column);
}