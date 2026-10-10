# -*- coding: utf-8 -*-
"""
VELOCE GT-01 — original parametric supercar modelled in Blender (headless).
Builds a detailed, unbranded mid-engine hypercar as a real mesh, assigns PBR
materials, renders studio previews, and exports a GLB for React Three Fiber.

Axes: X = length (front +X), Y = width, Z = up. Units: metres.
Run:  blender --background --python blender/build_car.py
"""
import bpy
import os
import math
from mathutils import Vector

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'

def collection(name):
    c = bpy.data.collections.get(name)
    if not c:
        c = bpy.data.collections.new(name)
        scene.collection.children.link(c)
    return c

car_col = collection("GT01")

def link_to(obj, col):
    for c in obj.users_collection:
        c.objects.unlink(obj)
    col.objects.link(obj)

# ----------------------------------------------------------------------------- |
# Materials
# ----------------------------------------------------------------------------- |
def new_mat(name):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    return m, m.node_tree.nodes.get("Principled BSDF")

def set_in(bsdf, names, value):
    for n in names:
        if n in bsdf.inputs:
            bsdf.inputs[n].default_value = value
            return

mat_paint, b = new_mat("BodyPaint")
set_in(b, ["Base Color"], (1.0, 0.33, 0.06, 1.0))
set_in(b, ["Metallic"], 0.5)
set_in(b, ["Roughness"], 0.30)
set_in(b, ["Coat Weight", "Clearcoat"], 1.0)
set_in(b, ["Coat Roughness", "Clearcoat Roughness"], 0.03)

mat_carbon, b = new_mat("Carbon")
set_in(b, ["Base Color"], (0.015, 0.015, 0.018, 1.0))
set_in(b, ["Metallic"], 0.1)
set_in(b, ["Roughness"], 0.55)
set_in(b, ["Coat Weight", "Clearcoat"], 0.12)

mat_glass, b = new_mat("Glass")
set_in(b, ["Base Color"], (0.015, 0.017, 0.022, 1.0))
set_in(b, ["Metallic"], 0.0)
set_in(b, ["Roughness"], 0.03)
set_in(b, ["Transmission Weight", "Transmission"], 0.8)
set_in(b, ["IOR"], 1.45)

mat_tire, b = new_mat("Tire")
set_in(b, ["Base Color"], (0.018, 0.018, 0.02, 1.0))
set_in(b, ["Roughness"], 0.85)

mat_rim, b = new_mat("Rim")
set_in(b, ["Base Color"], (0.55, 0.56, 0.6, 1.0))
set_in(b, ["Metallic"], 1.0)
set_in(b, ["Roughness"], 0.28)

mat_chrome, b = new_mat("Chrome")
set_in(b, ["Base Color"], (0.9, 0.9, 0.92, 1.0))
set_in(b, ["Metallic"], 1.0)
set_in(b, ["Roughness"], 0.06)

mat_caliper, b = new_mat("Caliper")
set_in(b, ["Base Color"], (1.0, 0.36, 0.05, 1.0))
set_in(b, ["Metallic"], 0.4)
set_in(b, ["Roughness"], 0.35)

mat_head, b = new_mat("Headlight")
set_in(b, ["Base Color"], (0.85, 0.92, 1.0, 1.0))
set_in(b, ["Roughness"], 0.08)
set_in(b, ["Emission Color"], (0.85, 0.93, 1.0, 1.0))
set_in(b, ["Emission Strength"], 1.8)

mat_tail, b = new_mat("Taillight")
set_in(b, ["Base Color"], (0.35, 0.01, 0.0, 1.0))
set_in(b, ["Roughness"], 0.12)
set_in(b, ["Emission Color"], (1.0, 0.03, 0.02, 1.0))
set_in(b, ["Emission Strength"], 2.4)

mat_intake, b = new_mat("Intake")
set_in(b, ["Base Color"], (0.01, 0.01, 0.012, 1.0))
set_in(b, ["Roughness"], 0.7)
set_in(b, ["Metallic"], 0.3)

# ----------------------------------------------------------------------------- |
# Loft helper (superellipse stations, asymmetric top/bottom)
# ----------------------------------------------------------------------------- |
def super_pt(t, W, Ht, Hb, n):
    ct, st = math.cos(t), math.sin(t)
    z = W * math.copysign(abs(ct) ** (2.0 / n), ct)
    H = Ht if st >= 0 else Hb
    y = H * math.copysign(abs(st) ** (2.0 / n), st)
    return z, y

def build_loft(name, stations, M=36):
    # station = (x, floor, top, W, n)
    verts, faces, rings = [], [], []
    for (x, floor, top, W, n) in stations:
        yc = 0.5 * (floor + top)
        Ht = 0.5 * (top - floor)
        Hb = Ht
        ring = []
        for i in range(M):
            t = 2 * math.pi * i / M
            z, y = super_pt(t, W, Ht, Hb, n)
            ring.append(len(verts))
            verts.append((x, z, yc + y))
        rings.append(ring)
    for a, bb in zip(rings[:-1], rings[1:]):
        for i in range(M):
            j = (i + 1) % M
            faces.append((a[i], a[j], bb[j], bb[i]))
    for ring, idx in ((rings[0], 0), (rings[-1], len(stations) - 1)):
        x, floor, top, W, n = stations[idx]
        yc = 0.5 * (floor + top)
        c = len(verts); verts.append((x, 0.0, yc))
        for i in range(M):
            j = (i + 1) % M
            faces.append((c, ring[j], ring[i]) if idx == 0 else (c, ring[i], ring[j]))
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    link_to(obj, car_col)
    for p in mesh.polygons:
        p.use_smooth = True
    return obj

def subsurf(obj, levels=2):
    m = obj.modifiers.new("Subsurf", 'SUBSURF')
    m.levels = levels
    m.render_levels = levels
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=m.name)

# ----------------------------------------------------------------------------- |
# Body — low, wide, muscular mid-engine proportions
# ----------------------------------------------------------------------------- |
BODY_STATIONS = [
    ( 2.35, 0.30, 0.62, 0.44, 2.6),
    ( 2.05, 0.26, 0.78, 0.72, 2.8),
    ( 1.70, 0.22, 0.96, 0.94, 3.0),
    ( 1.45, 0.20, 1.06, 1.02, 3.4),   # front fender crest
    ( 1.00, 0.18, 0.98, 1.02, 3.6),
    ( 0.50, 0.17, 0.90, 0.96, 3.8),
    ( 0.00, 0.17, 0.90, 0.90, 4.0),
    (-0.55, 0.18, 0.96, 0.98, 4.0),
    (-1.10, 0.20, 1.08, 1.06, 3.6),
    (-1.50, 0.22, 1.12, 1.06, 3.4),   # rear fender crest
    (-2.00, 0.26, 0.96, 0.86, 3.0),
    (-2.35, 0.32, 0.80, 0.54, 2.6),
]
body = build_loft("Body", BODY_STATIONS)
body.data.materials.append(mat_paint)
subsurf(body, 2)

CABIN_STATIONS = [
    ( 0.92, 0.86, 0.98, 0.50, 3.0),
    ( 0.52, 0.90, 1.20, 0.58, 3.4),
    ( 0.05, 0.90, 1.28, 0.60, 3.6),
    (-0.48, 0.90, 1.20, 0.56, 3.6),
    (-0.88, 0.88, 1.00, 0.46, 3.2),
]
cabin = build_loft("Cabin", CABIN_STATIONS, M=30)
cabin.data.materials.append(mat_glass)
subsurf(cabin, 2)

# ----------------------------------------------------------------------------- |
# Primitives
# ----------------------------------------------------------------------------- |
def add_cyl(name, r, depth, loc, mat, rot=(math.radians(90), 0, 0), verts=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc)
    o = bpy.context.active_object; o.name = name; o.rotation_euler = rot
    o.data.materials.append(mat)
    for p in o.data.polygons:
        p.use_smooth = abs(p.normal.z) < 0.9
    link_to(o, car_col); return o

def add_torus(name, R, r, loc, mat):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r,
                                     major_segments=56, minor_segments=20, location=loc)
    o = bpy.context.active_object; o.name = name
    o.rotation_euler = (math.radians(90), 0, 0)
    o.data.materials.append(mat)
    for p in o.data.polygons:
        p.use_smooth = True
    link_to(o, car_col); return o

def add_box(name, dims, loc, mat, rot=(0, 0, 0), bevel=0.012):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object; o.name = name
    o.scale = dims; o.rotation_euler = rot
    bv = o.modifiers.new("Bevel", 'BEVEL'); bv.width = bevel; bv.segments = 3
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.modifier_apply(modifier=bv.name)
    o.data.materials.append(mat)
    link_to(o, car_col); return o

# ----------------------------------------------------------------------------- |
# Wheels
# ----------------------------------------------------------------------------- |
TIRE_R, TIRE_T = 0.40, 0.11
AXLE_Z = TIRE_R + TIRE_T          # ~0.51 so the tyre meets the ground
AXLE_F, AXLE_R = 1.45, -1.50
TRACK = 0.90

def build_wheel(tag, x, y):
    out = math.copysign(1, y)      # outward direction (+Y or -Y)
    add_torus(f"Tire_{tag}", TIRE_R, TIRE_T, (x, y, AXLE_Z), mat_tire)
    # rim barrel (the visible metal ring wall)
    add_cyl(f"Barrel_{tag}", 0.34, 0.17, (x, y, AXLE_Z), mat_rim)
    # outer spoke face sits proud of the barrel so spokes read clearly
    y_out = y + out * 0.09
    for k in range(6):
        ang = k * (2 * math.pi / 6)
        sx = x + math.cos(ang) * 0.17
        sz = AXLE_Z + math.sin(ang) * 0.17
        add_box(f"Spoke_{tag}_{k}", (0.07, 0.04, 0.30), (sx, y_out, sz), mat_rim,
                rot=(0, -ang, 0))
    add_cyl(f"Hub_{tag}", 0.10, 0.06, (x, y_out, AXLE_Z), mat_chrome)
    # brake disc + caliper on the inner side (seen between spokes)
    y_in = y - out * 0.02
    add_cyl(f"Disc_{tag}", 0.30, 0.03, (x, y_in, AXLE_Z), mat_chrome)
    add_box(f"Caliper_{tag}", (0.05, 0.07, 0.18), (x + 0.22, y_in, AXLE_Z), mat_caliper)

build_wheel("FL", AXLE_F,  TRACK)
build_wheel("FR", AXLE_F, -TRACK)
build_wheel("RL", AXLE_R,  TRACK)
build_wheel("RR", AXLE_R, -TRACK)

# ----------------------------------------------------------------------------- |
# Carve wheel arches (after subsurf for clean edges)
# ----------------------------------------------------------------------------- |
def arch_cutter(x, y):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=0.58, depth=1.2,
                                        location=(x, y, AXLE_Z))
    o = bpy.context.active_object
    o.rotation_euler = (math.radians(90), 0, 0)
    return o

for x in (AXLE_F, AXLE_R):
    for y in (TRACK, -TRACK):
        c = arch_cutter(x, y)
        mod = body.modifiers.new("Arch", 'BOOLEAN')
        mod.operation = 'DIFFERENCE'; mod.object = c; mod.solver = 'EXACT'
        bpy.context.view_layer.objects.active = body
        bpy.ops.object.modifier_apply(modifier=mod.name)
        bpy.data.objects.remove(c, do_unlink=True)
for p in body.data.polygons:
    p.use_smooth = True

# ----------------------------------------------------------------------------- |
# Aero + details
# ----------------------------------------------------------------------------- |
add_box("Splitter", (0.34, 2.0, 0.05), (2.26, 0, 0.16), mat_carbon)
add_box("Diffuser", (0.40, 1.7, 0.14), (-2.24, 0, 0.24), mat_carbon,
        rot=(0, math.radians(-12), 0))
for i in range(5):
    add_box(f"Fin_{i}", (0.36, 0.03, 0.16), (-2.24, -0.7 + i * 0.35, 0.24), mat_carbon,
            rot=(0, math.radians(-12), 0))
add_box("Wing", (0.44, 1.9, 0.055), (-2.16, 0, 1.06), mat_carbon,
        rot=(0, math.radians(8), 0))
for yy in (0.95, -0.95):
    add_box(f"WingEnd_{yy}", (0.52, 0.04, 0.36), (-2.14, yy, 0.92), mat_carbon)
for yy in (0.55, -0.55):
    add_box(f"WingStrut_{yy}", (0.1, 0.05, 0.36), (-2.02, yy, 0.86), mat_carbon)

for yy in (0.62, -0.62):
    add_box(f"Head_{yy}", (0.045, 0.34, 0.05), (2.24, yy, 0.62), mat_head,
            rot=(0, math.radians(20), 0))
add_box("TailBar", (0.045, 1.34, 0.05), (-2.34, 0, 0.70), mat_tail)

for yy in (1.0, -1.0):
    add_box(f"Intake_{yy}", (0.5, 0.06, 0.24), (-0.95, yy, 0.62), mat_intake)
    add_box(f"Mirror_{yy}", (0.10, 0.16, 0.06), (0.55, yy * 1.02, 0.92), mat_carbon)
    add_box(f"MirrorArm_{yy}", (0.14, 0.03, 0.03), (0.62, yy * 0.96, 0.90), mat_carbon)
    add_box(f"Skirt_{yy}", (1.7, 0.10, 0.12), (0.0, yy * 0.84, 0.30), mat_carbon)

# ----------------------------------------------------------------------------- |
# Studio world + lights + ground + cameras
# ----------------------------------------------------------------------------- |
world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
scene.world = world; world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
bg.inputs[0].default_value = (0.015, 0.015, 0.02, 1.0)
bg.inputs[1].default_value = 1.0

def area_light(name, loc, rot, energy, size, color=(1, 1, 1)):
    ld = bpy.data.lights.new(name, 'AREA'); ld.energy = energy; ld.size = size
    ld.color = color
    lo = bpy.data.objects.new(name, ld); lo.location = loc; lo.rotation_euler = rot
    scene.collection.objects.link(lo); return lo

area_light("Key",  (3.5, -4.0, 5.0), (math.radians(46), 0, math.radians(40)), 1400, 5, (1, 0.97, 0.92))
area_light("Fill", (-3.5, 4.5, 3.5), (math.radians(55), 0, math.radians(-140)), 700, 6, (0.82, 0.88, 1.0))
area_light("Rim",  (-5.0, -2.5, 3.2), (math.radians(60), 0, math.radians(-115)), 1000, 3, (1.0, 0.5, 0.2))
area_light("Top",  (0, 0, 6.0), (0, 0, 0), 800, 6, (1, 1, 1))

bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
ground = bpy.context.active_object; ground.name = "Ground"
mg, b = new_mat("Ground")
set_in(b, ["Base Color"], (0.02, 0.02, 0.024, 1.0))
set_in(b, ["Roughness"], 0.18)
set_in(b, ["Metallic"], 0.5)
ground.data.materials.append(mg)

def make_cam(name, loc, target, lens=50):
    cd = bpy.data.cameras.new(name); cd.lens = lens
    o = bpy.data.objects.new(name, cd); scene.collection.objects.link(o)
    o.location = loc
    d = Vector(target) - Vector(loc)
    o.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
    return o

hero = make_cam("CamHero", (5.6, -4.4, 1.75), (0, 0, 0.55), 50)
side = make_cam("CamSide", (0.2, -7.2, 1.15), (0, 0, 0.6), 60)

engines = {i.identifier for i in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items}
scene.render.engine = 'BLENDER_EEVEE_NEXT' if 'BLENDER_EEVEE_NEXT' in engines else 'BLENDER_EEVEE'
scene.render.resolution_x = 1280
scene.render.resolution_y = 720
try:
    scene.eevee.taa_render_samples = 48
except Exception:
    pass

out_dir = os.path.dirname(os.path.abspath(__file__))
scene.camera = hero
scene.render.filepath = os.path.join(out_dir, "preview_hero.png")
bpy.ops.render.render(write_still=True)
scene.camera = side
scene.render.filepath = os.path.join(out_dir, "preview_side.png")
bpy.ops.render.render(write_still=True)

# ----------------------------------------------------------------------------- |
# Export GLB (car only)
# ----------------------------------------------------------------------------- |
for o in bpy.data.objects:
    o.select_set(False)
for o in car_col.objects:
    o.select_set(True)
bpy.context.view_layer.objects.active = body

glb_path = os.path.abspath(os.path.join(out_dir, "..", "public", "veloce-gt01.glb"))
bpy.ops.export_scene.gltf(
    filepath=glb_path, export_format='GLB', use_selection=True,
    export_apply=True, export_yup=True, export_materials='EXPORT', export_extras=True,
)
print("EXPORTED_GLB:", glb_path)
print("DONE")
