/* USUARIES I PERMISOS */

Table usuaries {
  id integer [primary key]
  nom varchar [not null]
  email varchar [not null]
  password varchar [not null]
  activada boolean [default: false]
  rol varchar [default: 'user', note: 'user | admin | superadmin']
  created_at timestamp
}

Table ciutats {
  id integer [primary key]
  nom varchar [not null]
  activada boolean [default: true]
  provincia varchar
}

Table administradores {
  id integer [primary key]
  usuaria integer [not null]
  ciutat integer [not null]
}

Ref: administradores.usuaria > usuaries.id
Ref: administradores.ciutat > ciutats.id

/* CONTINGUT */

Table imatges{
  id integer [primary key]
  nom varchar [not null]
  imatge varchar [not null]
}

Table preguntes{
  id integer [primary key]
  pregunta text [not null]
  imatge varchar
}

Ref: preguntes.imatge > imatges.id

Table respostes{
  id integer [primary key]
  resposta text [not null]
}

Table situacions{
  id integer [primary key]
  ciutat integer [not null]
  pregunta integer [not null]
  següent_pregunta integer [not null]
  resposta integer [not null]
  posicio integer
}

Ref: situacions.ciutat > ciutats.id
Ref: situacions.pregunta > preguntes.id
Ref: situacions.següent_pregunta > preguntes.id
Ref: situacions.resposta > respostes.id

/* ITINERARIS D'USUÀRIA */

Table itineraris{
  id integer [primary key]
  usuaria integer [not null]
  ciutat integer [not null]
}

Ref: itineraris.usuaria > usuaries.id
Ref: itineraris.ciutat > ciutats.id

Table passos{
  id integer [primary key]
  itinerari integer [not null]
  pregunta integer [not null]
  resposta integer [not null]
}

Ref: passos.itinerari > itineraris.id
Ref: passos.pregunta > preguntes.id
Ref: passos.resposta > respostes.id