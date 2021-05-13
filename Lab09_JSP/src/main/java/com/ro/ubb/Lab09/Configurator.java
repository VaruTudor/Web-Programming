package com.ro.ubb.Lab09;

public final class Configurator {

    private Configurator() {
    }

    public final static String DB_CONNECTION_STRING = "jdbc:postgresql://localhost:5432/Puzzle";
    public final static String DRIVER_NAME = "org.postgresql.Driver";
    public final static String USERNAME = System.getProperty("username");
    public final static String PASSWORD = System.getProperty("password");

    public final static int NUMBER_ROWS_COLUMNS = 3;
    public final static int INITIAL_SCORE = 0;
}
