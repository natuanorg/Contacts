
const GET_ALL_CONTACTS = `select * from contacts order by name asc`
const GET_ALL_GROUPS = `select * from groups left join (select group_id, COUNT(contact_id) as total_contact from contact_groups group by group_id) as cg on groups.id = cg.group_id`

const SEARCH_CONTACT_BY_PHONE = (keyword) => `select * from contacts where phone_number like '%${keyword}%'`
const SEARCH_CONTACT_BY_NAME = (keyword) => `select * from contacts where id in (select rowid from contacts_fts where contacts_fts match '${keyword}*')`

const CREATE_GROUP = groupName => `insert into groups(name) values ('${groupName}') returning id;`

const ADD_USERS_TO_GROUP = (values) => `insert into contact_groups(group_id, contact_id) values ${values}`

const SEARCH_GROUPS_BY_CONTACT_IDS = ids => `SELECT groups.id, groups.name, count(contact_id) as total from groups join contact_groups on groups.id = contact_groups.group_id 
WHERE groups.id in (select DISTINCT group_id from contact_groups where contact_id in (${ids.join(',')}))
GROUP BY group_id`

const QUERY = {
    GET_ALL_CONTACTS, 
    GET_ALL_GROUPS, 
    SEARCH_CONTACT_BY_PHONE,
    SEARCH_CONTACT_BY_NAME,
    ADD_USERS_TO_GROUP,
    SEARCH_GROUPS_BY_CONTACT_IDS,
    CREATE_GROUP
}

export default QUERY

