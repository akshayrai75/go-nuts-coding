package com.goNutsCoding.evolvedVision.entity;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;

public class PgSQLEnumType {
    public void nullSafeSet(
            PreparedStatement ps, Object value, int index,
            SharedSessionContractImplementor session
    ) throws HibernateException, SQLException {

        ps.setObject(index,value!=null? ((Enum)value).name():null, Types.OTHER);
    }
}
