package com.example.alexey.universaltable;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    private EditText search;
    private Table table;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        table = new Table();

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        search = (EditText)findViewById(R.id.search);
        search.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                onSearch();
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
    }

    public void onAddRowPressed(View v) {
        table.createRow(this);
    }

    public void onSearch() {
        String text = search.getText().toString();
        if (!text.equals("")) {
            ArrayList<ArrayList<Integer>> matches = new ArrayList<ArrayList<Integer>>(table.getColumns());

            for (int i = 0; i < table.getColumns(); ++i)
                matches.add(table.indexOf(text, i));

            for (int i = 0; i < table.size(); ++i)
                table.hideRow(i);

            for (int i = 0; i < matches.size(); ++i)
                for (int j = 0; j < matches.get(i).size(); ++j)
                    table.showRow(matches.get(i).get(j));
        } else {
            for (int i = 0; i < table.size(); ++i)
                table.showRow(i);
        }
    }

    public void onClearPressed(View v) {
        search.setText("");
        onSearch();
    }
}
