package itmo.web.lab3.database;

import itmo.web.lab3.Point;

import java.util.List;

import javax.persistence.*;
import javax.enterprise.inject.Default;
/**
 * @author Romariok on 05.11.2023
 */
@Default
public class DataBaseConnection implements DataBase{
    private final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("DataBase");
    private final EntityManager entityManager = entityManagerFactory.createEntityManager();

    @Override
    public void save(Point point) {
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin();
            entityManager.persist(point);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
        }
    }
    @Override
    public List<Point> getAll() {
        return entityManager.createQuery("SELECT p FROM Point p", Point.class).setMaxResults(50).getResultList();
    }
}
