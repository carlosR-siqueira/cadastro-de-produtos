
import { NextRequest, NextResponse } from 'next/server';
import { database } from '@lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, push } from 'firebase/database';

export async function POST(request: NextRequest) {
  const { name, category, subcategory, description, imgUrl1, imgUrl2, imgUrl3  } = await request.json();
  
  if (!name || !category || !subcategory || !description || !imgUrl1 || !imgUrl2 || !imgUrl3 ) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 });
  }

  try {
    const dbRef = ref(database, `produto/${category}`);
    await push(dbRef, {name, category, subcategory, description, imgUrl1, imgUrl2, imgUrl3});

    return NextResponse.json({ message: 'Produto criado com sucesso!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao inserir o produto',error: (error as Error).message }, { status: 500 });
  }
}


