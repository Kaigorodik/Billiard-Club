package com.platform.projapp.error;

/**
 * @author Kaigorodova Liubov
 */

public class ErrorConstants {
    public static ErrorInfo RT_NOT_IN_BD = ErrorInfo.of("RefreshTokenNotInBD", "Refresh token отсутствует в базе данных");
    public static ErrorInfo ROLE_NOT_FOUND = ErrorInfo.of("RoleNotFound", "Роль не найдена");
    public static ErrorInfo PROJECT_NOT_FOUND = ErrorInfo.of("ProjectNotFound", "Проект не найден");
    public static ErrorInfo INCORRECT_NUMBER_OF_PAGES = ErrorInfo.of("IncorrectNumberOfPages", "Неверное количество страниц");
    public static ErrorInfo INCOMPLETE_DATA = ErrorInfo.of("IncompleteData", "Неполные данные");
    public static ErrorInfo INCORRECT_DATA = ErrorInfo.of("IncorrectData", "Неверные данные");

    public static String USERNAME_OR_PASSWORD_NOT_FOUND = "Пользователь с таким логином и паролем не найден";
    public static String LOGIN_IS_BUSY = "Пользователь с таким логином уже зарегистрирован";
    public static String PASSWORD_IS_EMPTY = "Поле пароль обязательно для заполнения";
}
