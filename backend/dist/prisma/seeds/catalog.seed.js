"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCatalog = seedCatalog;
const client_1 = require("@prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function seedCatalog(prisma) {
    console.log('\n🚀 Iniciando Importación de Catálogo Maestro de Productos...\n');
    const rootCatalogDir = path.resolve(__dirname, '../../../../catalog');
    const fallbackCatalogDir = path.resolve(process.cwd(), '../catalog');
    const catalogDir = fs.existsSync(rootCatalogDir) ? rootCatalogDir : fallbackCatalogDir;
    if (!fs.existsSync(catalogDir)) {
        console.warn(`⚠️ No se encontró la carpeta de catálogo en '${catalogDir}'. Omitiendo importación.`);
        return;
    }
    let marcasCreadas = 0;
    let categoriasCreadas = 0;
    let proveedoresCreados = 0;
    let productosCreados = 0;
    let productosActualizados = 0;
    let productosOmitidos = 0;
    const errores = [];
    const marcasSet = new Set();
    const categoriasSet = new Set();
    const proveedoresSet = new Set();
    const getJsonFiles = (dir) => {
        let results = [];
        const list = fs.readdirSync(dir);
        list.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat && stat.isDirectory()) {
                results = results.concat(getJsonFiles(filePath));
            }
            else if (file.endsWith('.json')) {
                results.push(filePath);
            }
        });
        return results;
    };
    const jsonFiles = getJsonFiles(catalogDir);
    console.log(`📂 Se encontraron ${jsonFiles.length} archivos JSON en el catálogo.`);
    for (const jsonFile of jsonFiles) {
        console.log(`📄 Procesando archivo: ${path.relative(catalogDir, jsonFile)}`);
        let rawContent = '';
        try {
            rawContent = fs.readFileSync(jsonFile, 'utf-8');
        }
        catch (e) {
            errores.push({ error: `Error leyendo archivo ${jsonFile}: ${e.message}` });
            continue;
        }
        let items = [];
        try {
            items = JSON.parse(rawContent);
            if (!Array.isArray(items)) {
                errores.push({ error: `El archivo ${jsonFile} no contiene un arreglo válido.` });
                continue;
            }
        }
        catch (e) {
            errores.push({ error: `Error procesando JSON en ${jsonFile}: ${e.message}` });
            continue;
        }
        for (const item of items) {
            const ref = (item.reference || item.referencia || '').trim();
            const nombreOficial = (item.officialName || item.nombreOficial || '').trim();
            const marcaNombre = (item.brand || item.marca || '').trim();
            const catNombre = (item.category || item.categoria || '').trim();
            const desc = item.description || item.descripcion || undefined;
            const modeloProd = (item.model || item.modelo || ref).trim();
            const isOfficial = item.isOfficial !== undefined ? Boolean(item.isOfficial) : true;
            const originFrom = item.createdFrom === 'MANUAL' ? client_1.CreatedFrom.MANUAL : client_1.CreatedFrom.CATALOG;
            const datasheet = item.resources?.datasheet || item.datasheet || undefined;
            const manual = item.resources?.manual || item.manual || undefined;
            const imagenUrl = item.resources?.image || item.imagenUrl || undefined;
            const rawSpecs = item.specifications || item.especificaciones;
            const especificacionesVal = rawSpecs
                ? rawSpecs
                : undefined;
            const tecnologia = item.tecnologia || (rawSpecs?.technology ? String(rawSpecs.technology) : undefined);
            const resolucion = item.resolucion || (rawSpecs?.resolution ? String(rawSpecs.resolution) : undefined);
            const lente = item.lente || (rawSpecs?.lens ? String(rawSpecs.lens) : undefined);
            const audio = item.audio || (rawSpecs?.audio !== undefined ? String(rawSpecs.audio) : rawSpecs?.microphone ? 'Micrófono Integrado' : undefined);
            const visionNocturna = item.visionNocturna || (rawSpecs?.irDistance ? String(rawSpecs.irDistance) : rawSpecs?.nightVision ? String(rawSpecs.nightVision) : undefined);
            const alimentacion = item.alimentacion || (rawSpecs?.powerSupply ? String(rawSpecs.powerSupply) : undefined);
            const proteccionIP = item.proteccionIP || (rawSpecs?.protection ? String(rawSpecs.protection) : undefined);
            if (!ref || !nombreOficial || !marcaNombre || !catNombre) {
                errores.push({
                    referencia: ref || 'DESCONOCIDA',
                    error: `Campos obligatorios faltantes (referencia/reference, nombreOficial/officialName, marca/brand, categoria/category).`,
                });
                productosOmitidos++;
                continue;
            }
            try {
                let marca = await prisma.marca.findUnique({ where: { nombre: marcaNombre } });
                if (!marca) {
                    marca = await prisma.marca.create({
                        data: { nombre: marcaNombre, descripcion: `Marca oficial ${marcaNombre}`, activo: true },
                    });
                    marcasCreadas++;
                }
                marcasSet.add(marcaNombre);
                let categoria = await prisma.categoria.findUnique({ where: { nombre: catNombre } });
                if (!categoria) {
                    categoria = await prisma.categoria.create({
                        data: { nombre: catNombre, descripcion: `Categoría oficial de ${catNombre}`, activo: true },
                    });
                    categoriasCreadas++;
                }
                categoriasSet.add(catNombre);
                const provNombre = `${marcaNombre} Distribución Oficial`;
                let proveedor = await prisma.proveedor.findFirst({ where: { nombre: provNombre } });
                if (!proveedor) {
                    proveedor = await prisma.proveedor.create({
                        data: {
                            nombre: provNombre,
                            contacto: `Contacto Oficial ${marcaNombre}`,
                            telefono: '+56900000000',
                            correo: `soporte@${marcaNombre.toLowerCase().replace(/\s+/g, '')}.com`,
                            direccion: 'Distribuidor Mayorista Autorizado',
                            activo: true,
                        },
                    });
                    proveedoresCreados++;
                }
                proveedoresSet.add(provNombre);
                const codigoInterno = ref;
                const existingProduct = await prisma.producto.findFirst({
                    where: {
                        OR: [
                            { referencia: ref },
                            { codigoInterno: codigoInterno },
                            {
                                AND: [
                                    { nombre: nombreOficial },
                                    { marcaId: marca.id },
                                    { modelo: modeloProd },
                                ],
                            },
                        ],
                    },
                });
                if (existingProduct) {
                    if (existingProduct.createdFrom === client_1.CreatedFrom.MANUAL) {
                        productosOmitidos++;
                        console.log(`  - ⏩ Omitido (Producto MANUAL existente): ${ref}`);
                        continue;
                    }
                    await prisma.producto.update({
                        where: { id: existingProduct.id },
                        data: {
                            referencia: ref,
                            nombreOficial: nombreOficial,
                            descripcion: desc || existingProduct.descripcion,
                            imagenUrl: imagenUrl || existingProduct.imagenUrl,
                            datasheet: datasheet || existingProduct.datasheet,
                            manual: manual || existingProduct.manual,
                            especificaciones: especificacionesVal ?? (existingProduct.especificaciones || undefined),
                            tecnologia: tecnologia || existingProduct.tecnologia,
                            resolucion: resolucion || existingProduct.resolucion,
                            lente: lente || existingProduct.lente,
                            audio: audio || existingProduct.audio,
                            visionNocturna: visionNocturna || existingProduct.visionNocturna,
                            alimentacion: alimentacion || existingProduct.alimentacion,
                            proteccionIP: proteccionIP || existingProduct.proteccionIP,
                        },
                    });
                    productosActualizados++;
                    console.log(`  - 🔄 Actualizado (Oficial): ${ref}`);
                }
                else {
                    await prisma.producto.create({
                        data: {
                            codigoInterno: codigoInterno,
                            referencia: ref,
                            nombre: nombreOficial,
                            nombreOficial: nombreOficial,
                            modelo: modeloProd,
                            descripcion: desc,
                            imagenUrl: imagenUrl,
                            datasheet: datasheet,
                            manual: manual,
                            especificaciones: especificacionesVal,
                            createdFrom: originFrom,
                            isOfficial: isOfficial,
                            marcaId: marca.id,
                            categoriaId: categoria.id,
                            proveedorId: proveedor.id,
                            precioCompra: item.commercial?.purchasePrice ?? 0,
                            margenPorcentaje: item.commercial?.marginPercentage ?? 0,
                            precioVenta: item.commercial?.salePrice ?? 0,
                            garantiaMeses: 12,
                            tecnologia: tecnologia,
                            resolucion: resolucion,
                            lente: lente,
                            audio: audio,
                            visionNocturna: visionNocturna,
                            alimentacion: alimentacion,
                            proteccionIP: proteccionIP,
                            activo: true,
                        },
                    });
                    productosCreados++;
                    console.log(`  - ✨ Creado (Catálogo): ${ref}`);
                }
            }
            catch (err) {
                errores.push({ referencia: ref || item.referencia || item.reference, error: err.message || String(err) });
            }
        }
    }
    console.log('\n======================================================');
    console.log('📊 RESUMEN DE IMPORTACIÓN DE CATÁLOGO MAESTRO');
    console.log('======================================================');
    console.log(`🏷️  Marcas creadas:           ${marcasCreadas}`);
    console.log(`📁 Categorías creadas:       ${categoriasCreadas}`);
    console.log(`🚚 Proveedores creados:      ${proveedoresCreados}`);
    console.log(`✨ Productos creados:        ${productosCreados}`);
    console.log(`🔄 Productos actualizados:   ${productosActualizados}`);
    console.log(`⏩ Productos omitidos:       ${productosOmitidos}`);
    console.log(`❌ Errores encontrados:      ${errores.length}`);
    if (errores.length > 0) {
        console.log('\n⚠️ Detalle de errores:');
        errores.forEach((e, idx) => {
            console.log(`  ${idx + 1}. [${e.referencia || 'N/A'}] ${e.error}`);
        });
    }
    console.log('======================================================\n');
}
//# sourceMappingURL=catalog.seed.js.map