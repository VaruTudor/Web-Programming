package com.ro.ubb.Lab09;

import java.sql.*;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class DatabaseConnector {
    private Connection connection;
    private int score = Configurator.INITIAL_SCORE;
    private final int number_of_puzzle_pieces = Configurator.NUMBER_ROWS_COLUMNS;
    
    public void connect() {
        try {
            Class.forName(Configurator.DRIVER_NAME);
            connection = DriverManager.getConnection(
                    Configurator.DB_CONNECTION_STRING,
                    Configurator.USERNAME,
                    Configurator.PASSWORD
            );
        } catch (Exception ex) {
            System.out.println("Error connecting to database, errorMessage: " + ex.getMessage());
        }
    }

    public void disconnect() {
        try {
            connection.close();
        } catch (Exception ex) {
            System.out.println("Error disconnecting from database, errorMessage: " + ex.getMessage());
        }
    }



    public int getUserId(String username, String password){
        try {
            PreparedStatement pStmtSelect = this.connection.prepareStatement("SELECT id FROM users WHERE username = ? AND password = ?");
            pStmtSelect.setString(1, username);
            pStmtSelect.setString(2, password);
            ResultSet resultSet =  pStmtSelect.executeQuery();
            if(!resultSet.next()){
                return 0;
            }else {
                return resultSet.getInt("id");
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return 0;
    }


    /**
     * Swaps 2 puzzle pieces for a user having userId as id.
     */
    public void swap(int id1, int id2, int userId) {

        try {
            PreparedStatement pStmtSelect = this.connection.prepareStatement("SELECT SUM(Position) FROM puzzle WHERE ID IN (?, ?) AND user_id = ?");
            pStmtSelect.setInt(1, id1);
            pStmtSelect.setInt(2, id2);
            pStmtSelect.setInt(3, userId);
            ResultSet rs = pStmtSelect.executeQuery();
            rs.next();
            int sum = Integer.parseInt(rs.getString(1));
            PreparedStatement pStmt = this.connection.prepareStatement("UPDATE puzzle SET Position = ? - Position WHERE ID IN (?, ?) AND user_id = ?");
            pStmt.setInt(1, sum);
            pStmt.setInt(2, id1);
            pStmt.setInt(3, id2);
            pStmt.setInt(4, userId);
            pStmt.executeUpdate();

            PreparedStatement us = this.connection.prepareStatement("UPDATE score SET value = score.value + 1 WHERE user_id = ?");
            us.setInt(1, userId);
            us.execute();
        } catch (SQLException e) {
            System.out.println("Error while swapping " + e.getMessage());
        }
    }

    public void resetGame(int userId) {
        List<Integer> randomDistinctPuzzlePiecesArray = shuffleArray();
        try {
            // clear old data and initialize score with 0
            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM puzzle WHERE user_id = ?");
            preparedStatement.setInt(1, userId);
            preparedStatement.execute();


            PreparedStatement preparedStatement1 = connection.prepareStatement("DELETE FROM score WHERE user_id = ?");
            preparedStatement1.setInt(1, userId);
            preparedStatement1.execute();

            PreparedStatement preparedStatement2 = connection.prepareStatement("INSERT INTO score VALUES (0,?)");
            preparedStatement2.setInt(1, userId);
            preparedStatement2.execute();

        } catch (SQLException e) {
            e.printStackTrace();
        }

        try {
            for (int i = 0; i < number_of_puzzle_pieces * number_of_puzzle_pieces; i++) {
                PreparedStatement preparedStatement = this.connection
                        .prepareStatement("INSERT INTO puzzle (ID, Position, user_id) VALUES(?, ?, ?)");
                preparedStatement.setInt(1, i);
                preparedStatement.setInt(2, randomDistinctPuzzlePiecesArray.get(i));
                preparedStatement.setInt(3, userId);
                preparedStatement.executeUpdate();
            }
        } catch (SQLException e) {
            System.out.println("SqlException: " + e.toString());
            e.printStackTrace();
        }
    }

    /**
     * make an array of random distinct integers bounded by 0 and number_of_puzzle_pieces * number_of_puzzle_pieces
     * @return the shuffled list
     */
    private List<Integer> shuffleArray() {
        List<Integer> randomDistinctPuzzlePieces = IntStream.rangeClosed(0, number_of_puzzle_pieces  * number_of_puzzle_pieces - 1)
                .boxed()
                .collect(Collectors.toList());

        // shuffle the list
        Collections.shuffle(randomDistinctPuzzlePieces);
        return randomDistinctPuzzlePieces;
    }

    public String getPuzzle(int userId) {
        StringBuilder res = new StringBuilder();
        try {
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM score WHERE user_id = ?");
            preparedStatement.setInt(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()) {
                score = resultSet.getInt("value");
            }else {
                throw new RuntimeException("no rows");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        res.append("<p>Score: ").append(score).append("</p>");
        try {
            PreparedStatement preparedStatement = connection.prepareStatement("SELECT  * FROM puzzle where ID >= 0 and ID < ? AND user_id = ?");
            preparedStatement.setInt(1, number_of_puzzle_pieces  * number_of_puzzle_pieces );
            preparedStatement.setInt(2, userId);
            ResultSet rs = preparedStatement.executeQuery();
            int[] where = new int[number_of_puzzle_pieces  * number_of_puzzle_pieces ];
            while (rs.next()) {
                where[rs.getInt("position")] = rs.getInt("id");
            }
            boolean solved = true;
            for (int i = 0; i < number_of_puzzle_pieces  * number_of_puzzle_pieces ; ++i) {
                if (where[i] != i)
                    solved = false;
                res.append("<img id = '").append(where[i]).append("' class='puzzle_piece' src='utils/").append(where[i]).append(".jpg'/>");
            }
            if (solved) {
                res.append("<p>Congratulations, you finished the puzzle in: ").append(this.score).append("!</p>");
                res.append("<link rel='stylesheet' type='text/css' href='lock.css'>");
            }
        } catch (Exception ex) {
            System.out.println("Error on get Puzzle: " + ex.getMessage());
        }
        return res.toString();
    }
}