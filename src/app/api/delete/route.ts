import { NextRequest, NextResponse } from 'next/server';
import { database } from '@lib/firebaseConfig'; // Ajuste o caminho conforme necessário
import { ref, push } from 'firebase/database';